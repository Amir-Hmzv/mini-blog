import Head from "next/head";
import styles from "../styles/Home.module.css";
import { GraphQLClient, gql } from "graphql-request";
import BlocgCard from "../components/BlocgCard";

const graphcms = new GraphQLClient(
  "https://api-ap-southeast-2.hygraph.com/v2/cl7f2n6dh6ipo01ujfexhedkm/master"
);

const Query = gql`
  {
    posts {
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

export default function Home({ posts }) {
  console.log(posts);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {posts.map((post) => (
          <BlocgCard
            title={post.title}
            author={post.author}
            coverPhoto={post.coverPhoto}
            key={post.id}
            date_published={post.date_published}
            slug={post.slug}
          />
        ))}
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const { posts } = await graphcms.request(Query);
  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
}
