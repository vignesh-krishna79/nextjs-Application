import { useRouter } from "next/router";
import { Fragment } from "react";
import Head from 'next//head'
import NewMeetUpForm from "../../components/meetups/NewMeetupForm";

function NewMeetUp() {
  const router = useRouter();

  async function addMeetUp(enteredMeetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);

    router.replace("/");
  }

  return (
    <Fragment>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name="description"
          content="Add your own meetups and create amazing networking opportunities."
        ></meta>
      </Head>
      <NewMeetUpForm onAddMeetup={addMeetUp} />
    </Fragment>
  );
}

export default NewMeetUp;
