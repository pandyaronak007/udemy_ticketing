import Link from 'next/link';

const LandingPage = ({ currentUser, tickets }) => {
  console.log('index currentUser => ', currentUser)
  console.log('index tickets => ', tickets)
  // return currentUser ?
  //   (<h1>You are signed in</h1>) :
  //   (<h1>You are NOT singed in</h1>);

  const ticketList = tickets.map(ticket => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td>
          <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`} className='nav-link'>
            View
          </Link>
        </td>
      </tr>
    )
  })

  return (
    <div>
      <h1>Ticket List</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {ticketList}
        </tbody>
      </table>
    </div>
  )
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  let url = '/api/tickets';
  const { data = {} } = await client.get(url)
  return { tickets: data };
};

export default LandingPage;