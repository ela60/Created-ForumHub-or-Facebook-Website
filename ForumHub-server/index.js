const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIP_SECRET_KEY);
const port = process.env.PORT || 4000;

// middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kisu1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const froumCollection = client.db("froumDb").collection("froum");
    const announcementCollection = client
      .db("froumDb")
      .collection("announcements");
    const commentCollection = client.db("froumDb").collection("comments");
    const paymentsCollection = client.db("froumDb").collection("payments");
    const userCollection = client.db("froumDb").collection("users");
    const tagCollection = client.db("froumDb").collection("tags");

    // jwt related api
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });
      res.send({ token });
    });

    // middlewares
    const verifyToken = (req, res, next) => {
      console.log("inside verify token", req.headers);
      if (!req.headers.authorization) {
        return res.status(401).send({ message: "unauthorize access1" });
      }
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
        if (err) {
          return res.status(401).send({ message: "unauthorize access2" });
        }
        req.decode = decode;
        next();
      });
    };

    // use verify admin after verifyToken
    const verifyAdmin = async (req, res, next) => {
      const email = req.decode.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      const isAdmin = user?.role === "admin";
      if (!isAdmin) {
        return res.status(403).send({ message: "forbidden access " });
      }
      next();
    };

    // payment intent
    app.post("/create-payment-intent", async (req, res) => {
      const { price } = req.body;

      // Validate the price input
      if (!price || isNaN(price) || price <= 0) {
        return res.status(400).json({ error: "Invalid price value" });
      }

      const amount = Math.round(price * 100);

      // Create payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });

      // Send client secret to the frontend
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });

    // Store payment data and update user membership
    app.post("/payments", async (req, res) => {
      const { email, transactionId, price, date, membership } = req.body;

      const paymentRecord = {
        email,
        transactionId,
        price,
        date,
        membership,
      };

      // Insert payment record into 'payments' collection
      const paymentResult = await paymentsCollection.insertOne(paymentRecord);

      // Update user's membership status in 'users' collection
      const updateResult = await client
        .db("froumDb")
        .collection("users")
        .updateOne(
          { email: email },
          { $set: { membership: "Gold", postLimit: 100 } }
        );

      res.send(paymentResult);
    });

    // search related api
    app.get("/search", async (req, res) => {
      const { query } = req.query;
      console.log("Search query received:", query);

      try {
        if (!query || query.trim() === "") {
          return res.status(400).json({ message: "Search query is empty" });
        }

        const results = await froumCollection
          .find({
            tag: { $regex: query, $options: "i" },
          })
          .toArray();

        // console.log("Search results from MongoDB:", results);

        if (results.length === 0) {
          return res.status(200).json({ message: "No results found" });
        }

        res.status(200).json(results);
      } catch (error) {
        console.error("Error searching posts:", error);
        res.status(500).json({ message: "Error searching posts" });
      }
    });

    // tag related api

    app.get("/tags", async (req, res) => {
      try {
        const tags = await froumCollection.find({}).toArray();
        res.send(tags);
      } catch (error) {
        res.status(500).send({ error: "Failed to fetch tags" });
      }
    });

    // get all post in the home page
    app.get("/posts", async (req, res) => {
      const { page = 1, limit = 5, sortBy = "newest" } = req.query;
      const skip = (page - 1) * limit;

      try {
        const sortOrder =
          sortBy === "popularity" ? { voteDifference: -1 } : { postTime: -1 };

        const posts = await froumCollection
          .aggregate([
            {
              $lookup: {
                from: "comments",
                localField: "postTitle",
                foreignField: "postTitle",
                as: "comments",
              },
            },
            {
              $addFields: {
                commentsCount: { $size: "$comments" },
                voteDifference: { $subtract: ["$upvotes", "$downvotes"] },
              },
            },
            { $sort: sortOrder },
            { $skip: skip },
            { $limit: parseInt(limit) },
          ])
          .toArray();

        if (posts.length === 0) {
          return res.status(200).json({ posts: [], totalPages: 0 });
        }

        const totalPosts = await froumCollection.countDocuments();
        const totalPages = Math.ceil(totalPosts / limit);

        console.log("Fetched Posts:", posts);

        res.status(200).json({ posts, totalPages });
      } catch (error) {
        res.status(500).json({ message: "Failed to fetch posts", error });
      }
    });

    // Get Available posts
    app.get("/posts", async (req, res) => {
      try {
        const posts = await froumCollection.find().toArray();
        res.status(200).json({ posts });
      } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Failed to fetch posts" });
      }
    });

    app.get("/posts", async (req, res) => {
      const { authorName } = req.query;

      try {
        const filter = authorName ? { authorName } : {};
        const posts = await froumCollection.find(filter).toArray();
        res.status(200).json({ posts });
      } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Failed to fetch posts" });
      }
    });

    app.get("/posts/:postTitle/comments/count", async (req, res) => {
      const { postTitle } = req.params;
      try {
        const commentCount = await commentCollection.countDocuments({
          postTitle,
        });
        res.status(200).json({ commentCount });
      } catch (error) {
        console.error("Error fetching comment count:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });

    // Get all comments for a post
    app.get("/posts/:postId/comments", async (req, res) => {
      try {
        const comments = await commentCollection.find({
          id: req.params.postId,
        });
        res.status(200).json(comments);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    // Add a new comment
    app.post("/posts/:postId/comments", async (req, res) => {
      const { comment } = req.body;
      try {
        const newComment = new commentCollection({
          id: req.params.postId,
          comment,
        });
        await newComment.save();
        res.status(201).json(newComment);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    // Route to fetch user posts count
    app.get("/posts", async (req, res) => {
      const { id } = req.query;
      try {
        const userPosts = await froumCollection
          .find({ authorEmail: id })
          .toArray();
        res.send(userPosts);
      } catch (error) {
        res.status(500).send({ error: "Failed to fetch posts" });
      }
    });

    // Route to add new post
    app.post("/posts", async (req, res) => {
      const newPost = req.body;
      try {
        const result = await froumCollection.insertOne(newPost);
        res.send(result);
      } catch (error) {
        res.status(500).send({ error: "Failed to add post" });
      }
    });

    // Get user's posts
    app.get("/posts/user/:email", async (req, res) => {
      const email = req.params.email;
      try {
        const posts = await froumCollection
          .find({ authorEmail: email })
          .toArray();
        res.status(200).json(posts);
      } catch (err) {
        res.status(500).json({ error: "Error fetching posts" });
      }
    });
    app.delete("/posts/:id", async (req, res) => {
      const postId = req.params.id;
      try {
        const result = await froumCollection.deleteOne({
          _id: new ObjectId(postId),
        });
        res.send(result);
      } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).send({ error: "Failed to delete post" });
      }
    });

    app.get("/posts", async (req, res) => {
      const { id } = req.query;
      try {
        const userPosts = await froumCollection.find({ id }).toArray();
        res.send(userPosts);
      } catch (error) {
        console.error("Error fetching user posts:", error);
        res.status(500).send({ error: "Failed to fetch posts" });
      }
    });

    app.get("/post/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const query = { _id: new ObjectId(id) };
        const post = await froumCollection.findOne(query);

        if (!post) {
          return res.status(404).json({ message: "post not found" });
        }
        res.json(post);
      } catch (error) {
        res.status(500).json({ message: "Server error" });
      }
    });

    // 2. Get Comments for a Post
    app.get("/comments/:id", async (req, res) => {
      const { id } = req.params;
      const comments = await commentCollection.find({ id }).toArray();
      res.send(comments);
    });

    // 3. Add a Comment
    app.post("/comments", async (req, res) => {
      const { id, comment } = req.body;
      console.log(req.body);
      const result = await commentCollection.insertOne({
        id,
        comment,
        createdAt: new Date(),
      });
      res.send(result);
    });

    // 4. Upvote a Post
    app.patch("/post/:id/upvote", async (req, res) => {
      const { id } = req.params;
      await froumCollection.updateOne(
        { _id: new ObjectId(id) },
        { $inc: { upvotes: 1 } }
      );
      res.send({ message: "Post upvoted" });
    });

    // 5. Downvote a Post
    app.patch("/post/:id/downvote", async (req, res) => {
      const { id } = req.params;
      await froumCollection.updateOne(
        { _id: new ObjectId(id) },
        { $inc: { downvotes: 1 } }
      );
      res.send({ message: "Post downvoted" });
    });

    // Add post Route
    app.post("/posts", async (req, res) => {
      try {
        const post = req.body;
        const result = await froumCollection.insertOne(post);
        res.status(201).send(result);
      } catch (error) {
        res.status(500).send({ error: "Failed to add food" });
      }
    });

    // Get all announcements
    app.get("/announcements", async (req, res) => {
      try {
        const announcements = await announcementCollection.find().toArray();
        res.status(200).json(announcements);
      } catch (error) {
        console.error("Error fetching announcements:", error);
        res.status(500).json({ message: "Error fetching announcements" });
      }
    });

    // Add announce Route on Admin Dashboard
    app.post("/announcements", async (req, res) => {
      try {
        const post = req.body;
        const result = await announcementCollection.insertOne(post);
        res.status(201).send(result);
      } catch (error) {
        res.status(500).send({ error: "Failed to add announce" });
      }
    });

    // Get announcement count
    app.get("/announcements/count", async (req, res) => {
      try {
        const count = await announcementCollection.countDocuments();
        res.status(200).json({ count });
      } catch (error) {
        console.error("Error counting announcements:", error);
        res.status(500).json({ message: "Error counting announcements" });
      }
    });

    // GET user's membership status

    app.get("/users/membership-status", async (req, res) => {
      const { email } = req.query;

      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      try {
        const user = await userCollection.findOne({ email });

        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ membership: user.membership });
      } catch (error) {
        console.error("Error fetching membership:", error);
        res.status(500).json({ message: "Failed to fetch membership status" });
      }
    });
    // profile page api
    app.get("/posts/recent", async (req, res) => {
      const { email, limit = 3 } = req.query;

      try {
        const posts = await froumCollection
          .find({ authorEmail: email })
          .sort({ postTime: -1 })
          .limit(parseInt(limit))
          .toArray();

        res.status(200).json(posts);
      } catch (err) {
        console.error("Error fetching recent posts:", err);
        res
          .status(500)
          .json({ message: "Error fetching recent posts", error: err });
      }
    });

    // Fetch Comments for a Post

    // Get comments by post ID
    app.get("/comments/:id", async (req, res) => {
      try {
        const commentId = req.params.id;
        const comments = await commentCollection
          .find({ id: commentId })
          .toArray();

        if (comments.length > 0) {
          res.status(200).json(comments);
        } else {
          res.status(404).json({ message: "No comments found" });
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ message: "Error fetching comments" });
      }
    });

    // Report a Comment

    app.put("/api/comments/report/:id", async (req, res) => {
      const commentId = req.params.id;
      const { feedback } = req.body;

      try {
        if (!feedback) {
          return res.status(400).send({ message: "Feedback is required." });
        }

        const updatedComment = await commentCollection.updateOne(
          { _id: new ObjectId(commentId) },
          {
            $set: {
              isReported: true,
              reportReason: feedback,
              reportStatus: "Pending",
              reportedAt: new Date(),
            },
          }
        );

        if (updatedComment.matchedCount === 0) {
          return res.status(404).send({ message: "Comment not found." });
        }

        res
          .status(200)
          .send({ message: "Comment reported successfully.", updatedComment });
      } catch (error) {
        console.error("Error reporting comment:", error);
        res.status(500).send({ message: "Failed to report comment." });
      }
    });

    // Users releted api
    app.get("/users", verifyToken, verifyAdmin, async (req, res) => {
      // console.log(req.headers);
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    app.get("/users/admin/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      if (email !== req.decode.email) {
        return res.status(403).send({ message: "forbidden access" });
      }

      const query = { email: email };
      const user = await userCollection.findOne(query);
      // console.log({user});
      let admin = false;
      if (user) {
        admin = user?.role === "admin";
      }
      // console.log(admin);
      res.send({ admin });
    });

    // Create a new user
    app.post("/users", async (req, res) => {
      const user = req.body;
      // insert email if user doesn't exists:
      // you can do this many ways(1.email unique,2.upsert,3.simple checking)
      const query = { email: user.email };
      const existingUser = await userCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: "user already exist", insertedId: null });
      }
      const result = await userCollection.insertOne(user);
      res.send(result);
    });
// make admin
    app.patch(
      "/users/admin/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.id;
        const filter = {
          _id: new ObjectId(id),
        };
        const updatedDoc = {
          $set: {
            role: "admin",
          },
        };
        const result = await userCollection.updateOne(filter, updatedDoc);
        res.send(result);
      }
    );

    app.delete("/users/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const query = {
        _id: new ObjectId(id),
      };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });

    // Promote user to admin
    app.put(
      "/users/:id/make-admin",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const userId = req.params.id;
        const updatedUser = await userCollection.updateOne(
          { _id: new ObjectId(userId) },
          { $set: { role: "admin" } }
        );
        res.send(updatedUser);
      }
    );

    // Reported Activities/Comments Page: related api
    app.get("/admin/reported-comments", async (req, res) => {
      const result = await commentCollection.find().toArray();
      res.send(result);
    });

    app.put("/admin/comments/dismiss/:id", async (req, res) => {
      try {
        const commentId = req.params.id;
        await commentCollection.updateOne(
          { _id: new ObjectId(commentId) },
          { $set: { reportStatus: "Dismissed" } }
        );
        res.status(200).json({ message: "Report dismissed" });
      } catch (error) {
        console.error("Error dismissing report:", error);
        res.status(500).json({ message: "Error dismissing report" });
      }
    });

    app.post("/admin/comments/warn/:id", async (req, res) => {
      try {
        const commentId = req.params.id;
        const comment = await commentCollection.findOne({
          _id: new ObjectId(commentId),
        });
        // Simulate sending an email warning (In production, integrate with email service)
        console.log(`Warning sent to ${comment.email}`);
        res.status(200).json({ message: "User warned successfully" });
      } catch (error) {
        console.error("Error warning user:", error);
        res.status(500).json({ message: "Error warning user" });
      }
    });

    //  update
    app.get(
      "/admin/comments/dismiss/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await commentCollection.findOne(query);

        if (result) {
          res.send(result);
        } else {
          res.status(404).send({ message: "Item not found" });
        }
      }
    );

    app.delete("/admin/comments/:id", async (req, res) => {
      const id = req.params.id;
      const query = {
        _id: new ObjectId(id),
      };
      const result = await commentCollection.deleteOne(query);
      res.send(result);
    });

    // admin profile related api
    app.get("/admin/:email", verifyToken, verifyAdmin, async (req, res) => {
      try {
        const email = req.params.email; 
    
        const admin = await userCollection.findOne({ email, role: 'admin' }); 
        if (!admin) {
          return res.status(404).send({ error: "Admin user not found" });
        }
    
        const usersCount = await userCollection.estimatedDocumentCount();
        const forumPostsCount = await froumCollection.estimatedDocumentCount();
        const commentsCount = await commentCollection.estimatedDocumentCount();
    
        res.send({
          name: admin.name,
          email: admin.email,
          photoURL: admin.photoURL,
          usersCount, 
          forumPostsCount,
          commentsCount 
        });
    
      } catch (error) {
        console.error("Error fetching admin data:", error);
        res.status(500).send({ error: "An error occurred while retrieving admin data" });
      }
    });
    
    
  // Fetch tags from the collection
app.get('/api/tags', async (req, res) => {
  try {
    const tags = await tagCollection.find().toArray(); 
    res.json(tags); 
  } catch (err) {
    console.error('Error fetching tags:', err);
    res.status(500).json({ message: 'Error fetching tags' }); 
  }
});

    // Route for adding tags
    app.post('/admin/tags', verifyToken, verifyAdmin, async (req, res) => {
      console.log('Request received:', req.body);
      const { name } = req.body;  
      if (!name) {
        return res.status(400).send('Tag name is required');  
      }
      const existingTag = await tagCollection.findOne({ name });
      if (existingTag) {
        return res.status(400).send('Tag already exists');
      }
      const newTag = { name };  
      await tagCollection.insertOne(newTag);  
    
      res.status(201).send('Tag added successfully'); 
    });
    

    // API endpoint for paginated data
    app.get("/users", async (req, res) => {
      try {
       
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
    
       
        if (page < 1) return res.status(400).send("Page must be a positive integer");
        if (limit < 1) return res.status(400).send("Limit must be a positive integer");
    
      
        const skip = (page - 1) * limit;
  
        const users = await userCollection
          .find()
          .skip(skip)
          .limit(limit)
          .toArray();
    
        // Count the total number of users in the collection
        const totalUsers = await userCollection.countDocuments();
        
        // Calculate total pages
        const totalPages = Math.ceil(totalUsers / limit);
    
        // Send the response with the users data, totalUsers, and totalPages
        res.json({
          users,
          totalUsers,
          totalPages,
        });
      } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Internal Server Error");
      }
    });
    

    // await client.db("admin").command({ ping: 1 });
    // // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Froum user always commenting....... ");
});
app.listen(port, () => {
  console.log(`Bistro Boss is sitting on port ${port}`);
});
