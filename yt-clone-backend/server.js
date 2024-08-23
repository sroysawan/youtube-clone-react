const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const {swaggerSpec , swaggerUi} = require('./swagger')

const app = express();
dotenv.config();

app.use(bodyParser.json())
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
})

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log("Connected to database")
})

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve a list of videos.
 *     responses:
 *       '200':
 *         description: A JSON array of videos.
 */
app.get('/', (req, res) => {
    const query = `
    SELECT vl.video_id, vl.video_title, vl.video_description, vl.video_url, vl.video_thumbnail, vl.video_created_at,
        c.channel_id, c.channel_name, c.channel_profile_picture, 
        p.view_count
    FROM videos_long vl
    JOIN channels c ON vl.channel_id = c.channel_id
    JOIN popular p ON vl.video_id = p.video_id
    `;

    db.query(query, (err,results) => {
        if(err){
            console.error('เกิดข้อผิดพลาดการดึงข้อมูล:',err)
            res.status(500).send('เกิดข้อผิดพลาดการดึงข้อมูล')
        } else {
            res.json(results);
        }
        
    })
})


/**
 * @swagger
 * /short:
 *   get:
 *     summary: Retrieve a list of videos short.
 *     responses:
 *       '200':
 *         description: A JSON array of videos short.
 */
app.get('/short', (req, res) => {
    const query = `
    SELECT vs.video_id, vs.video_title, vs.video_description, vs.video_url, vs.video_thumbnail, vs.video_created_at,
        c.channel_id, c.channel_name, c.channel_profile_picture, 
        p.view_count
    FROM videos_short vs
    JOIN channels c ON vs.channel_id = c.channel_id
    JOIN popular p ON vs.video_id = p.video_id
    `;

    db.query(query, (err,results) => {
        if(err){
            console.error('เกิดข้อผิดพลาดการดึงข้อมูล:',err)
            res.status(500).send('เกิดข้อผิดพลาดการดึงข้อมูล')
        } else {
            res.json(results);
        }
        
    })
})



/**
 * @swagger
 * /subscribe:
 *   get:
 *     summary: Retrieve a list of subscribed channels for a user.
 *     parameters:
 *       - in: query
 *         name: user_id
 *         required: true
 *         description: The ID of the user.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A JSON array of subscribed channels.
 */
app.get('/subscribe', (req,res) => {
    const user_id = req.query.user_id;
    if(!user_id){
        res.status(400).send('กรุณาระบุ user_id');
        return;
    }

    const query = `
    SELECT u.user_id, u.user_name, u.user_profile_picture,
        c.channel_id, c.channel_name, c.channel_profile_picture
        FROM users u
        JOIN channel_subscribe cs ON u.user_id = cs.user_id
        JOIN channels c ON cs.channel_id = c.channel_id
        WHERE u.user_id = ?
    `;

    const values = [user_id]
    db.query(query,values, (err,results) => {
        if(err){
            console.error('เกิดข้อผิดพลาดการดึงข้อมูล:',err)
            res.status(500).send('เกิดข้อผิดพลาดการดึงข้อมูล')
        } else {
        res.json(results);
        }
    })
})


/**
 * @swagger
 * /result:
 *   get:
 *     summary: Search for videos based on a query.
 *     parameters:
 *       - name: search_query
 *         in: query
 *         required: true
 *         description: The search query.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A JSON array of videos.
 */
app.get('/result', (req,res) => {
    const {search_query} = req.query

    const query = `
    SELECT vl.video_id, vl.video_title, vl.video_created_at, vl.video_thumbnail,
        c.channel_name, c.channel_profile_picture,
        p.view_count
    FROM videos_long vl
    JOIN channels c ON vl.channel_id = c.channel_id
    JOIN popular p ON vl.video_id = p.video_id
    WHERE vl.video_title LIKE ? OR c.channel_name LIKE ?;
    `;


    db.query(query,[`%${search_query}%`, `%${search_query}%`],(err,result)=> {
        if(err){
            console.error('เกิดข้อผิดพลาดการดึงข้อมูล:',err)
            res.status(500).send('เกิดข้อผิดพลาดการดึงข้อมูล')
        } else {
        res.json(result);
        }
    })
})


/**
 * @swagger
 * /watch:
 *   get:
 *     summary: Retrieve details of a specific video.
 *     parameters:
 *       - name: v
 *         in: query
 *         required: true
 *         description: The video ID.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A JSON array containing details of the video.
 */
app.get('/watch',(req, res) => {
    const {v} = req.query;
    if(!v){
        res.status(400).send('Invalid video parameter')
        return
    }

    const query = `
    SELECT
        vl.video_id,
        vl.video_title,
        vl.video_description,
        vl.video_duration,
        vl.video_thumbnail,
        vl.video_url,
        vl.video_created_at,
        c.channel_name,
        c.channel_profile_picture,
        p.view_count,
        p.like_count,
        (SELECT COUNT(*) FROM channel_subscribe WHERE channel_id = vl.channel_id AND user_id = ?) AS is_subscribed,
        (
            SELECT GROUP_CONCAT(CONCAT(u.user_name, ': ' , cm.comment_text) ORDER BY cm.comment_created_at SEPARATOR '\n') 
            FROM comments cm
            JOIN users u ON cm.user_id = u.user_id
            WHERE cm.video_id = vl.video_id
        ) AS comments
    FROM videos_long vl
    JOIN channels c ON vl.channel_id = c.channel_id
    JOIN popular p ON vl.video_id = p.video_id
    WHERE vl.video_id = ?;
    `
    db.query(query,[v,v],(err,result)=> {
        if(err){
            console.error('เกิดข้อผิดพลาดการดึงข้อมูล:',err)
            res.status(500).send('เกิดข้อผิดพลาดการดึงข้อมูล')
        } else {
        const video = result[0]
        const comments = video.comments.split('\n').map(comment => {
            const [username, content] = comment.split(': ')
            return { [username]: {content}}
        })
        video.comments = comments
        res.json([video])
        }
    })
})

app.listen(3000 ,() => {
    console.log("Example app listening on port 3000!")
})