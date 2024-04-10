var _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = blogs => {
  var likes = blogs.reduce((sum, blog) => sum + blog.likes, 0)
  return likes
}

const findFavorite = blogs => {
  var favorite = blogs.reduce((prev, current) => { return prev.likes > current.likes ? prev : current })
  return favorite
}

const mostBlogs = blogs => {
  var groupedByAuthor = _.groupBy(blogs, 'author')

  let authorWithMostBlogs = '';
  let maxNumberOfBlogs = 0;

  for (const author in groupedByAuthor) {
    // Vérifier si le nombre de blogs pour cet auteur est le plus grand trouvé jusqu'à présent
    if (groupedByAuthor[author].length > maxNumberOfBlogs) {
      maxNumberOfBlogs = groupedByAuthor[author].length
      authorWithMostBlogs = author
    }
  }
  return { author: authorWithMostBlogs, blogs: maxNumberOfBlogs }
}

const mostLikes = blogs => {
  var groupedByAuthor = _.groupBy(blogs, 'author')

  var maxAuthor = ''
  var maxLikes = 0
  
  Object.keys(groupedByAuthor).map(key => {
      var likes = groupedByAuthor[key].reduce((sum, blog) => { return sum + blog.likes }, 0)
      if (likes > maxLikes){
        maxAuthor = key
        maxLikes = likes
      }
  })

  return { author: maxAuthor, likes: maxLikes }
}

module.exports = {
  dummy,
  totalLikes,
  findFavorite,
  mostBlogs,
  mostLikes
}
