import { Model } from 'objection';

function Post() {
  Model.apply(this, arguments)
}

Model.extend(Post);
Post.tableName = 'posts';

export default Post;
