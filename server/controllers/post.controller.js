import Post from '../models/post';
import slug from 'slug';
import cuid from 'cuid';
import moment from 'moment';
import sanitizeHtml from 'sanitize-html';

export function getPosts(req, res) {
  Post.query().then((posts) => {
    posts.sort((a, b) => {
      return (b.dateadded - a.dateadded);
    });
    res.json({ posts });
  })
  .catch((err) => {
    res.status(500).send(err);
  });
}

export function addPost(req, res) {
  if (!req.body.post.name || !req.body.post.title || !req.body.post.content) {
    return res.status(403).end();
  }
  const newPost = req.body.post;

  // Let's sanitize inputs
  newPost.title = sanitizeHtml(newPost.title);
  newPost.name = sanitizeHtml(newPost.name);
  newPost.content = sanitizeHtml(newPost.content);

  newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
  newPost.cuid = cuid();
  newPost.dateadded = moment().format('YYYY-MM-DD HH:mm:ssZ');
  newPost.updateddate = null;
  Post.query().insert(newPost).then((saved) => {
    res.json({ post: saved });
  })
  .catch((err) => {
    res.status(500).send(err);
  });
}

export function getPost(req, res) {
  const newSlug = req.query.slug.split('-');
  const newCuid = newSlug[newSlug.length - 1];
  Post.query().where('cuid', newCuid).then((post) => {
    res.json({ post });
  })
  .catch((err) => {
    res.status(500).send(err);
  });
}

export function deletePost(req, res) {
  const postcuid = req.body.postcuid;
  Post.query().delete().where('cuid', postcuid).then(() => {
    res.status(200).end();
  })
  .catch((err) => {
    res.status(500).send(err);
  });
}
