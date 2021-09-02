import Head from "next/head"
import { MongoClient } from "mongodb"
import MeetupList from "../components/meetups/MeetupList"
import { Fragment } from "react"

function HomePage(props) {
  return (
  <Fragment>
    <Head>
      <title>React Meetups</title>
      <meta name="description" content="Browse React meetups" />
    </Head>
    <MeetupList meetups={props.meetups} />
  </Fragment>
  )
}
//this is reserved name in next.js for the prerendering process to include fetch data
export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://new-user-testapp:528703N@cluster0.220tj.mongodb.net/meetups?retryWrites=true&w=majority"
  )
  const db = client.db()

  const meetupsCollection = db.collection("meetups")

  const meetups = await meetupsCollection.find().toArray()

  client.close()

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.data.title,
        address: meetup.data.address,
        image: meetup.data.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1, //# of seconds
  }
}

//this is alternative for getStaticProps - if we need to track data from server that change very fast, every second etc
// export async function getServerSideProps(context) {
//   const req = context.req
//   const res = context.res

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

export default HomePage
