import './Subscriptions';

function Subscriptions() {
  return (
    <div className='subscriptions'>
      <h1>Subscription Plans</h1>
      <div className='subscriptions-container'>
        <div className='sub-one'>
              <h1>FREE</h1>
              <p>Always free</p>
              <p>Upload up to 4 videos per month</p>
              <p>Sort Videos by Title, Date, and Location</p>
              <p>AI shot stats</p>
        </div>
        <div className='sub-two'>
              <h1>cost1</h1>
              <p>Always free</p>
              <p>Upload up to 4 videos per month</p>
              <p>Sort Videos by Title, Date, and Location</p>
              <p>AI shot stats</p>
        </div>
        <div className='sub-three'>
              <h1>cost2</h1>
              <p>Always free</p>
              <p>Upload up to 4 videos per month</p>
              <p>Sort Videos by Title, Date, and Location</p>
              <p>AI shot stats</p>
        </div>
      </div>
    </div>
  );
}

export default Subscriptions;