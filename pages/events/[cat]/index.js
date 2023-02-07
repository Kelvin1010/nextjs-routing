import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

function EventCatPage({data, pageName}) {
    return (
        <div>
            <h2>Event in {pageName}</h2>
            <div style={{
                display: 'flex',
                flexDirection:'column',
                justifyContent:'space-between',
                height:'70vh'
            }}>
                {data.map(ev => (
                    <Link  key={ev.id} href={`/events/${ev.city}/${ev.id}}`} passHref>
                            <Image width={200} height={150} src={ev.image} alt={ev.title}/>
                            <h2>{ev.title}</h2>
                            <p>{ev.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default EventCatPage;

export async function getStaticPaths() {
    const { events_categories } = await import('/data/data.json');
    const allPaths = events_categories.map((ev) => {
      return {
        params: {
          cat: ev.id.toString(),
        },
      };
    });
    return {
      paths: allPaths,
      fallback: false,
    };
}
  
export async function getStaticProps(context) {
    const id = context?.params.cat;
    const { allEvents } = await import('../../../data/data.json');
  
    const data = allEvents.filter((ev) => ev.city === id);
  
    return { props: { data, pageName: id } };
}