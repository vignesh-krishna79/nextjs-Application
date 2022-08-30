import { Fragment } from "react";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from 'next/head'


function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
        name='description' content="Browse a huge list highly active React meetups!"></meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// export async function getServerProps(context){
//     const res = context.res;
//     const req = context.req;
//     return{
//         props:{
//             meetups: DUMMY_DETAILS
//         }
//     };
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://vignesh_krishna:ks.kevin48K@cluster0.lcuro0q.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
