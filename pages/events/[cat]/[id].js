import React from 'react'

function EventOurSingle({data}) {
    console.log(data)
    return (
        <div>EventOurSingle</div>
    )
}

export default EventOurSingle;

export async function getStaticPaths() {
    const data = await import('../../../data/data.json');
    const allEvents = data.allEvents;
  
    const allPaths = allEvents.map((path) => {
      return {
        params: {
          cat: path.city.toString(),
          id: path.id.toString(),
        },
      };
    });

    return {
      paths: allPaths,
      fallback: false,
    };
}
  
export async function getStaticProps(context) {
    console.log(context);
    const id = context.params.id;
    const { allEvents } = await import('../../../data/data.json');
    const eventData = allEvents.find((ev) => ev.id === id);

    return {
      props: { data: eventData },
    };
}