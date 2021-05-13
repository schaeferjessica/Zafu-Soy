<h2>Gatsby + Shopify</h2>
<img alt="Gatsby" src="resources/images/shopify+gatsby.png" width="250px" />

<p style="text-decoration:underline">Docs:</p>

[Gatsy](https://www.gatsbyjs.com/docs/) Building an E-commerce site with Shopify

[Gatsy tutorial](https://www.gatsbyjs.org/tutorial/) Creating a Gatsy Side

STYLING: [Emotion](https://emotion.sh/docs/introduction) is used as styled components library.

🐼 <p style="text-decoration:underline">Setup Project:</p>
1. create new GitHub repository
2. install [brew install gh](https://cli.github.com/) and clone repo via GitHub CLI _(in commant line)_
3. download Xcode from apple store 
4. install [Node version management](https://www.npmjs.com/package/n): `npm install -g n` and install latest version `n latest`
   
5. create a new Gatsby site using this starter
     ```sh
    gatsby new my-shopify-store https://github.com/AlexanderProd/gatsby-shopify-starter
    ```
6. change into main folder `cd my-shopify-store`
7. start http://localhost:8000/ and [graphql](https://www.gatsbyjs.com/docs/tutorial/part-five/#introducing-graphiql) width `yarn install && yarn start`

   
🐼 <p style="text-decoration:underline">Features:</p>
Cart, Product grid, Product page, Dynamic Inventory Checking,Image optimization with Gatsby Image, Styled Components with Emotion, Google Analytics, SEO


⚠️ <p style="text-decoration:underline">Connect your own Shopify store</p>

- You need to have at least one published product on Shopify.
- You need to use the Shopify Storefront API credentials not the regular Shopify API.

Setting up your Shopify account: [Shopify](https://www.shopify.com/) Add TOKEN and NAME inside of `.env` and `gatsby-conf.js`.

SHOPIFY_ACCESS_TOKEN= storefront access token _(not API key)_
SHOP_NAME= name.~~myshopify.com~~ _(not private app name)_

📌 
<p style="text-decoration:underline">todos:</p>

[X] Convert Layout to function component.
  
[X] Add dynamic inventory checking to avoid re-building after every purchase. 

[X] Add better styling.

[X] Add image optimization using Gatsby sharp plugin.

[X] Convert ProductForm to function component.
