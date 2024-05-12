import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';
import logo from './logo.svg'
import BaseUrl from './BaseUrl';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch(`${BaseUrl}/api/listing/get?offer=true&limit=4`);
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch(`${BaseUrl}/api/listing/get?type=rent&limit=4`);
        const data = await res.json();
        
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch(`${BaseUrl}/api/listing/get?type=sale&limit=4`);
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);
  console.log(rentListings)
  
 /*  fetch('https://stylex.onrender.com/api/listing/get')
  .then(response => response.json()) // Parse the response as JSON
  .then(data => console.log(data)) // Log the response data
  .catch(error => console.error(error));  */
  
  return (
    <div className='fade-in flex flex-col items-center'>
      {/* top */}

      {/* logo */}
      <div style={{paddingTop: '15px', paddingBottom:'15px'}}>
        <img src={logo} style={{ height: '50px', width: '150px'  }}/>
      </div>

      <div className='shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg sm:w-[1520px] h-[280px]' style={{ backgroundColor: '#c7c5bf' }}>
      <div className='flex flex-col gap-6 p-3 px-3 max-w-2xl mx-auto'>
          <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          
          Experience luxury with <br/><span className='text-slate-500'>Style X </span>
            
            rental
          </h1>
          <div className='text-gray-1000 text-xs sm:text-sm'>
            We have a wide range of items for you to choose from.
          </div>
            
          <Link
            to={'/search'}
            className='text-xs sm:text-sm text-gray-800 font-bold hover:underline'
          >
            Let's get started...
          </Link>
        </div>
      </div>
        

      {/* swiper */}
      <Swiper navigation autoplay={{ delay: 1000 }}>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className=''
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing results for offer, sale and rent */}

      <div className='max-w-7.5xl mx-auto flex flex-col items-center gap-8 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className='' >
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent Luxury items to rent</h2>
              <Link className='text-xl text-blue-800 hover:underline' to={'/search?type=rent'}>Show more items for rent</Link>
            </div>
            <div className='flex flex-wrap gap-4 '>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
