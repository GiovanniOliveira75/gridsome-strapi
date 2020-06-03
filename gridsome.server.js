// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
  api.createPages(async ({ graphql, createPage }) => {
    const { data } = await graphql(`{
      allStrapiPost {
        edges {
          node {
              id
              title
              subtitle
              article
              image {
                url
                caption
              }
          }
        }
      }
    }`)

    data.allStrapiPost.edges.forEach(({ node }) => {
      createPage({
        path: `/blog/${node.id}`,
        component: './src/templates/Post.vue',
        context: {
          id: node.id
        }
      })
    })
  })
}
