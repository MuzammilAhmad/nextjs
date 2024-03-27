import { useEffect, useState } from "react";
import { mongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "First Meetup",
//     image:
//       "https://images.pexels.com/photos/50675/banquet-wedding-society-deco-50675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     address: "Lahore",
//     description: "Hello Event 1",
//   },
//   {
//     id: "m2",
//     title: "Second Meetup",
//     image:
//       "https://images.pexels.com/photos/19552713/pexels-photo-19552713/free-photo-of-silhouette-of-man-walking-in-front-of-a-mosque-in-black-and-white.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     address: "Lahore",
//     description: "Hello Event 2",
//   },
// ];

function HomePage(props) {
  // const [loadedMeetups, setLoadedMeetups] = useState([]);

  // useEffect(() => {
  //   //fetch
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // }, []);

  return <MeetupList meetups={props.meetups}></MeetupList>;
}

// server side code, does not render on client side
export async function getStaticProps() {
  const client = await mongoClient.connect("");
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
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
    revalidate: 10,
  };
}

export default HomePage;
