import { gql,GraphQLClient } from "graphql-request";
import React from "react";
import {useRouter} from 'next/router';
const graphcms = new GraphQLClient(
  "https://api-ap-southeast-2.hygraph.com/v2/cl7f2n6dh6ipo01ujfexhedkm/master"
);

const Query = gql`
  query Post($slug: String!) {
    post(where: {slug:$slug}) {
      title
      date_published
      id
      slug
      content {
        html
      }
      author {
        name
        avatar {
          url
        }
      }
      coverPhoto {
        url
      }
    }
  }

`;

const SlugList = gql`
{
    posts{
        slug
    }
}
`
export async function getStaticPaths(){
    const { posts } = await graphcms.request(SlugList);
    return{
        paths : posts.map((post) => ({params: {slug:post.slug}})),
        fallback:false
    }
    
}
export async function getStaticProps({params}) {
  const slug = params.slug
const data = await graphcms.request(Query,{slug});
const  post = data.post
return {
  props: {
    post,
  },
  revalidate: 10,
};
}


const Article = ({post}) => {
 console.log(post);
    const router = useRouter()
    console.log(router);
  return <main>
    <img src={post.coverPhoto.url} alt="" />
  </main>;
};

export default Article;

