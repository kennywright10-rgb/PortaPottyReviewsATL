const { put, head } = require('@vercel/blob');

const BLOB_KEY = 'portapotty-data.json';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

// Full default seed — used to populate the blob on first deploy
const DEFAULT_DATA = {
                cities: [
                    { id: 'atlanta', name: 'Atlanta', slug: 'atlanta' },
                    { id: 'alpharetta', name: 'Alpharetta', slug: 'alpharetta' },
                    { id: 'marietta', name: 'Marietta', slug: 'marietta' },
                    { id: 'roswell', name: 'Roswell', slug: 'roswell' },
                    { id: 'sandy-springs', name: 'Sandy Springs', slug: 'sandy-springs' },
                    { id: 'johns-creek', name: 'Johns Creek', slug: 'johns-creek' },
                    { id: 'duluth', name: 'Duluth', slug: 'duluth' },
                    { id: 'lawrenceville', name: 'Lawrenceville', slug: 'lawrenceville' }
                ],
                companies: [
                    // ATLANTA COMPANIES
                    {
                        id: 'patriot-atlanta',
                        name: 'Patriot Portables',
                        city: 'atlanta',
                        rating: 5,
                        reviewCount: 127,
                        phone: '(678) 456-3488',
                        location: 'Serving Atlanta Metro',
                        hours: 'Same Day Delivery Available',
                        website: 'https://patriotportables.com',
                        badges: ['Veteran Owned', 'Best of Forsyth 2024'],
                        services: ['Standard Porta Potties', 'ADA Compliant Units', 'Luxury Restroom Trailers', 'Hand Washing Stations', 'Construction Sites', 'Special Events'],
                        reviews: [
                            {
                                name: 'Julia S.',
                                rating: 5,
                                text: 'I can\'t say enough GREAT things about Patriot Portables! Ken was so personable, accessible and attentive. They delivered 4 porta potties early and picked them up on time. They were very clean! I HIGHLY RECOMMEND Patriot Portables!'
                            },
                            {
                                name: 'Elise M.',
                                rating: 5,
                                text: 'The team at Patriot went above and beyond to make my renting experience pleasant and seamless. Their products are clean and fresh. Thank you all for your hard work!'
                            }
                        ],
                        pros: [
                            'Veteran-owned and operated business',
                            'Brand new, spotlessly clean units',
                            'Same-day delivery available',
                            'Excellent customer service and communication',
                            'Owner personally oversees deliveries',
                            'Luxury restroom trailers available'
                        ],
                        cons: [
                            'Premium pricing compared to some competitors',
                            'Limited service area outside Metro Atlanta'
                        ]
                    },
                    {
                        id: 'atlanta-pros',
                        name: 'Atlanta Porta Potty Pros',
                        city: 'atlanta',
                        rating: 4,
                        reviewCount: 89,
                        phone: '(404) 555-0123',
                        location: 'Downtown Atlanta',
                        hours: '24/7 Service',
                        website: '',
                        badges: [],
                        services: ['Standard Units', 'VIP Trailers', 'Festival Services', 'Corporate Events'],
                        reviews: [
                            {
                                name: 'Michael T.',
                                rating: 5,
                                text: 'Great service for our construction site. Units were clean and serviced regularly. Would definitely use again for future projects.'
                            },
                            {
                                name: 'Sarah B.',
                                rating: 4,
                                text: 'Good overall experience. Delivery was on time and the units were in good condition. Pricing was competitive.'
                            }
                        ],
                        pros: [
                            '24/7 customer service availability',
                            'Competitive pricing',
                            'Regular servicing schedule',
                            'Experience with large construction projects'
                        ],
                        cons: [
                            'Units show signs of wear and tear',
                            'Communication could be improved',
                            'Limited luxury options'
                        ]
                    },
                    {
                        id: 'georgia-event',
                        name: 'Georgia Event Rentals',
                        city: 'atlanta',
                        rating: 5,
                        reviewCount: 156,
                        phone: '(404) 555-0456',
                        location: 'Midtown Atlanta',
                        hours: 'Emergency Service Available',
                        website: '',
                        badges: ['Top Rated 2025'],
                        services: ['Wedding Packages', 'Luxury Trailers', 'Event Planning', 'Full Service'],
                        reviews: [
                            {
                                name: 'Amanda K.',
                                rating: 5,
                                text: 'Perfect for our outdoor wedding! The luxury trailer was immaculate and added a touch of elegance. Staff was professional and attentive.'
                            }
                        ],
                        pros: [
                            'Specializes in high-end events and weddings',
                            'Immaculate luxury trailers',
                            'Emergency service available',
                            'Professional and attentive staff',
                            'Full event planning assistance'
                        ],
                        cons: [
                            'Higher price point',
                            'Requires advance booking for luxury units',
                            'Limited availability during peak wedding season'
                        ]
                    },
                    {
                        id: 'metro-sanitation',
                        name: 'Metro Sanitation Services',
                        city: 'atlanta',
                        rating: 4,
                        reviewCount: 73,
                        phone: '(404) 555-0789',
                        location: 'East Atlanta',
                        hours: 'Mon-Sat: 7AM-6PM',
                        website: '',
                        badges: [],
                        services: ['Construction Sites', 'Long-term Rentals', 'Commercial Projects'],
                        reviews: [
                            {
                                name: 'David R.',
                                rating: 4,
                                text: 'Reliable service for our 6-month construction project. Regular maintenance kept everything clean and functional.'
                            }
                        ]
                    },
                    {
                        id: 'southern-comfort',
                        name: 'Southern Comfort Portables',
                        city: 'atlanta',
                        rating: 5,
                        reviewCount: 94,
                        phone: '(404) 555-0234',
                        location: 'West Atlanta',
                        hours: 'Same Day Available',
                        website: '',
                        badges: [],
                        services: ['Special Events', 'Festival Services', 'ADA Units', 'Hand Wash Stations'],
                        reviews: [
                            {
                                name: 'Lisa P.',
                                rating: 5,
                                text: 'Fantastic service! They delivered exactly when promised and the units were spotless. Great pricing too!'
                            }
                        ]
                    },
                    {
                        id: 'peachtree-portable',
                        name: 'Peachtree Portable Solutions',
                        city: 'atlanta',
                        rating: 4,
                        reviewCount: 62,
                        phone: '(404) 555-0567',
                        location: 'Buckhead',
                        hours: 'Mon-Fri: 8AM-5PM',
                        website: '',
                        badges: [],
                        services: ['Corporate Events', 'Standard Units', 'Delivery & Pickup'],
                        reviews: [
                            {
                                name: 'Robert H.',
                                rating: 4,
                                text: 'Professional service and fair pricing. Units arrived on time and were picked up promptly after our event.'
                            }
                        ]
                    },

                    // ALPHARETTA COMPANIES
                    {
                        id: 'patriot-alpharetta',
                        name: 'Patriot Portables',
                        city: 'alpharetta',
                        rating: 5,
                        reviewCount: 127,
                        phone: '(678) 456-3488',
                        location: 'Serving Alpharetta',
                        hours: 'Same Day Delivery Available',
                        website: 'https://patriotportables.com',
                        badges: ['Veteran Owned', 'Best of Forsyth 2024'],
                        services: ['Standard Porta Potties', 'ADA Compliant Units', 'Luxury Restroom Trailers', 'Hand Washing Stations'],
                        reviews: [
                            {
                                name: 'Julie S.',
                                rating: 5,
                                text: 'Excellent service in Alpharetta! The equipment was brand new and never been used. Communication was clear and professional throughout.'
                            }
                        ]
                    },
                    {
                        id: 'north-fulton',
                        name: 'North Fulton Portable Restrooms',
                        city: 'alpharetta',
                        rating: 4,
                        reviewCount: 67,
                        phone: '(770) 555-1234',
                        location: 'Alpharetta, GA',
                        hours: 'Mon-Fri: 8AM-5PM',
                        website: '',
                        badges: [],
                        services: ['Corporate Events', 'Construction', 'VIP Trailers'],
                        reviews: [
                            {
                                name: 'Kevin M.',
                                rating: 4,
                                text: 'Good service for our office construction project. They were responsive to our needs.'
                            }
                        ]
                    },
                    {
                        id: 'alpha-events',
                        name: 'Alpharetta Event Solutions',
                        city: 'alpharetta',
                        rating: 5,
                        reviewCount: 112,
                        phone: '(770) 555-5678',
                        location: 'Downtown Alpharetta',
                        hours: '24/7 Emergency Service',
                        website: '',
                        badges: ['Top Rated'],
                        services: ['Weddings', 'Festivals', 'Luxury Options'],
                        reviews: [
                            {
                                name: 'Jennifer L.',
                                rating: 5,
                                text: 'Our wedding guests were impressed with the luxury trailer. Clean, spacious, and beautifully maintained!'
                            }
                        ]
                    },
                    {
                        id: 'premier-alpha',
                        name: 'Premier Portable Toilets',
                        city: 'alpharetta',
                        rating: 4,
                        reviewCount: 54,
                        phone: '(770) 555-9012',
                        location: 'North Alpharetta',
                        hours: 'Daily Service Available',
                        website: '',
                        badges: [],
                        services: ['Standard Units', 'ADA Compliant'],
                        reviews: []
                    },
                    {
                        id: 'clean-green-alpha',
                        name: 'Clean & Green Portables',
                        city: 'alpharetta',
                        rating: 5,
                        reviewCount: 88,
                        phone: '(770) 555-3456',
                        location: 'Alpharetta',
                        hours: 'Eco-Friendly Options',
                        website: '',
                        badges: ['Eco-Certified'],
                        services: ['Green Solutions', 'Event Services'],
                        reviews: [
                            {
                                name: 'Patricia W.',
                                rating: 5,
                                text: 'Love that they offer eco-friendly options! Great for our sustainability-focused event.'
                            }
                        ]
                    },

                    // MARIETTA COMPANIES
                    {
                        id: 'patriot-marietta',
                        name: 'Patriot Portables',
                        city: 'marietta',
                        rating: 5,
                        reviewCount: 127,
                        phone: '(678) 456-3488',
                        location: 'Serving Marietta',
                        hours: 'Same Day Delivery Available',
                        website: 'https://patriotportables.com',
                        badges: ['Veteran Owned'],
                        services: ['All Services Available'],
                        reviews: []
                    },
                    {
                        id: 'cobb-portables',
                        name: 'Cobb County Portables',
                        city: 'marietta',
                        rating: 4,
                        reviewCount: 76,
                        phone: '(770) 555-2345',
                        location: 'Marietta Square',
                        hours: 'Mon-Sat: 7AM-6PM',
                        website: '',
                        badges: [],
                        services: ['Construction', 'Events'],
                        reviews: [
                            {
                                name: 'Tom B.',
                                rating: 4,
                                text: 'Solid service for our construction needs. Weekly servicing was reliable.'
                            }
                        ]
                    },
                    {
                        id: 'marietta-sanitation',
                        name: 'Marietta Sanitation Pro',
                        city: 'marietta',
                        rating: 5,
                        reviewCount: 91,
                        phone: '(770) 555-6789',
                        location: 'East Marietta',
                        hours: '24/7 Service',
                        website: '',
                        badges: [],
                        services: ['Full Service', 'Emergency Response'],
                        reviews: [
                            {
                                name: 'Carol D.',
                                rating: 5,
                                text: 'They saved the day when we had an emergency need for additional units. Highly recommend!'
                            }
                        ]
                    },
                    {
                        id: 'quick-serve-marietta',
                        name: 'Quick Serve Portables',
                        city: 'marietta',
                        rating: 4,
                        reviewCount: 58,
                        phone: '(770) 555-0123',
                        location: 'West Marietta',
                        hours: 'Same Day Available',
                        website: '',
                        badges: [],
                        services: ['Fast Delivery', 'Standard Units'],
                        reviews: []
                    },
                    {
                        id: 'blue-ridge-marietta',
                        name: 'Blue Ridge Rentals',
                        city: 'marietta',
                        rating: 5,
                        reviewCount: 102,
                        phone: '(770) 555-4567',
                        location: 'Marietta',
                        hours: 'Full Service',
                        website: '',
                        badges: ['Family Owned'],
                        services: ['Premium Service', 'Long-term Rentals'],
                        reviews: [
                            {
                                name: 'Steve M.',
                                rating: 5,
                                text: 'Family-owned business that really cares. Been using them for years on our projects.'
                            }
                        ]
                    },
                    {
                        id: 'marietta-pro',
                        name: 'Marietta Portable Pro',
                        city: 'marietta',
                        rating: 4,
                        reviewCount: 45,
                        phone: '(770) 555-7890',
                        location: 'Central Marietta',
                        hours: 'Mon-Fri: 8AM-5PM',
                        website: '',
                        badges: [],
                        services: ['Construction Sites', 'Event Rentals'],
                        reviews: []
                    },

                    // ROSWELL COMPANIES
                    {
                        id: 'patriot-roswell',
                        name: 'Patriot Portables',
                        city: 'roswell',
                        rating: 5,
                        reviewCount: 127,
                        phone: '(678) 456-3488',
                        location: 'Serving Roswell',
                        hours: 'Same Day Delivery Available',
                        website: 'https://patriotportables.com',
                        badges: ['Veteran Owned'],
                        services: ['All Services Available'],
                        reviews: []
                    },
                    {
                        id: 'roswell-events',
                        name: 'Roswell Event Services',
                        city: 'roswell',
                        rating: 4,
                        reviewCount: 69,
                        phone: '(770) 555-7890',
                        location: 'Historic Roswell',
                        hours: 'Event Specialists',
                        website: '',
                        badges: [],
                        services: ['Weddings', 'Corporate Events', 'Luxury Trailers'],
                        reviews: [
                            {
                                name: 'Michelle R.',
                                rating: 4,
                                text: 'Great for our company picnic. Professional setup and takedown.'
                            }
                        ]
                    },
                    {
                        id: 'north-metro-roswell',
                        name: 'North Metro Portables',
                        city: 'roswell',
                        rating: 5,
                        reviewCount: 84,
                        phone: '(770) 555-1357',
                        location: 'East Roswell',
                        hours: '7 Days a Week',
                        website: '',
                        badges: [],
                        services: ['Standard Units', 'ADA Compliant', 'Hand Wash Stations'],
                        reviews: [
                            {
                                name: 'Brian K.',
                                rating: 5,
                                text: 'Dependable and clean. Used them for multiple events without any issues.'
                            }
                        ]
                    },
                    {
                        id: 'chattahoochee-portable',
                        name: 'Chattahoochee Portable Toilets',
                        city: 'roswell',
                        rating: 4,
                        reviewCount: 61,
                        phone: '(770) 555-2468',
                        location: 'Roswell',
                        hours: 'Mon-Sat',
                        website: '',
                        badges: [],
                        services: ['Construction', 'Events'],
                        reviews: []
                    },
                    {
                        id: 'elite-roswell',
                        name: 'Elite Restroom Rentals',
                        city: 'roswell',
                        rating: 5,
                        reviewCount: 97,
                        phone: '(770) 555-3579',
                        location: 'Roswell Area',
                        hours: 'Premium Service',
                        website: '',
                        badges: ['Luxury Specialist'],
                        services: ['Luxury Trailers', 'VIP Events', 'Weddings'],
                        reviews: [
                            {
                                name: 'Diana S.',
                                rating: 5,
                                text: 'The luxury trailer was stunning! Our wedding guests thought it was a permanent restroom. Worth every penny!'
                            }
                        ]
                    },

                    // SANDY SPRINGS COMPANIES
                    {
                        id: 'patriot-sandy',
                        name: 'Patriot Portables',
                        city: 'sandy-springs',
                        rating: 5,
                        reviewCount: 127,
                        phone: '(678) 456-3488',
                        location: 'Serving Sandy Springs',
                        hours: 'Same Day Delivery Available',
                        website: 'https://patriotportables.com',
                        badges: ['Veteran Owned'],
                        services: ['All Services Available'],
                        reviews: []
                    },
                    {
                        id: 'sandy-sanitation',
                        name: 'Sandy Springs Sanitation',
                        city: 'sandy-springs',
                        rating: 4,
                        reviewCount: 72,
                        phone: '(404) 555-8901',
                        location: 'Sandy Springs',
                        hours: 'Mon-Sat: 7AM-7PM',
                        website: '',
                        badges: [],
                        services: ['Construction', 'Commercial', 'Residential Events'],
                        reviews: [
                            {
                                name: 'Mark L.',
                                rating: 4,
                                text: 'Good pricing and reliable service. They handle all our commercial projects.'
                            }
                        ]
                    },
                    {
                        id: 'perimeter-portable',
                        name: 'Perimeter Portables',
                        city: 'sandy-springs',
                        rating: 5,
                        reviewCount: 86,
                        phone: '(404) 555-2345',
                        location: 'Perimeter Center',
                        hours: '24/7 Available',
                        website: '',
                        badges: [],
                        services: ['Corporate Events', 'Office Construction', 'Quick Service'],
                        reviews: [
                            {
                                name: 'Susan T.',
                                rating: 5,
                                text: 'Perfect for our office building renovation. Weekly service was always on time.'
                            }
                        ]
                    },
                    {
                        id: 'springs-solutions',
                        name: 'Springs Event Solutions',
                        city: 'sandy-springs',
                        rating: 4,
                        reviewCount: 64,
                        phone: '(404) 555-6789',
                        location: 'Sandy Springs',
                        hours: 'Event Focused',
                        website: '',
                        badges: [],
                        services: ['Events', 'Festivals', 'Standard & Luxury'],
                        reviews: []
                    },
                    {
                        id: 'executive-sandy',
                        name: 'Executive Portable Restrooms',
                        city: 'sandy-springs',
                        rating: 5,
                        reviewCount: 95,
                        phone: '(404) 555-0123',
                        location: 'Sandy Springs',
                        hours: 'Premium Service',
                        website: '',
                        badges: ['Top Rated 2025'],
                        services: ['Luxury Trailers', 'Executive Events', 'Corporate Functions'],
                        reviews: [
                            {
                                name: 'James P.',
                                rating: 5,
                                text: 'High-end service for high-end events. Their luxury trailers are immaculate.'
                            }
                        ]
                    },
                    {
                        id: 'sandy-springs-pro',
                        name: 'Sandy Springs Portable Pro',
                        city: 'sandy-springs',
                        rating: 4,
                        reviewCount: 51,
                        phone: '(404) 555-4567',
                        location: 'North Sandy Springs',
                        hours: 'Mon-Fri: 8AM-6PM',
                        website: '',
                        badges: [],
                        services: ['Standard Units', 'Construction Sites'],
                        reviews: []
                    },

                    // JOHNS CREEK COMPANIES
                    {
                        id: 'patriot-johns',
                        name: 'Patriot Portables',
                        city: 'johns-creek',
                        rating: 5,
                        reviewCount: 127,
                        phone: '(678) 456-3488',
                        location: 'Serving Johns Creek',
                        hours: 'Same Day Delivery Available',
                        website: 'https://patriotportables.com',
                        badges: ['Veteran Owned'],
                        services: ['All Services Available'],
                        reviews: []
                    },
                    {
                        id: 'johns-creek-portable',
                        name: 'Johns Creek Portable Solutions',
                        city: 'johns-creek',
                        rating: 4,
                        reviewCount: 68,
                        phone: '(678) 555-1234',
                        location: 'Johns Creek',
                        hours: 'Daily Service',
                        website: '',
                        badges: [],
                        services: ['Residential', 'Commercial', 'Events'],
                        reviews: [
                            {
                                name: 'Rachel G.',
                                rating: 4,
                                text: 'Great for our neighborhood block party. Clean units and friendly service.'
                            }
                        ]
                    },
                    {
                        id: 'creek-side',
                        name: 'Creek Side Rentals',
                        city: 'johns-creek',
                        rating: 5,
                        reviewCount: 79,
                        phone: '(678) 555-5678',
                        location: 'Johns Creek',
                        hours: 'Full Service',
                        website: '',
                        badges: [],
                        services: ['Events', 'Construction', 'Long-term'],
                        reviews: [
                            {
                                name: 'Andrew M.',
                                rating: 5,
                                text: 'Used them for our home renovation. Units were always clean and well-maintained.'
                            }
                        ]
                    },
                    {
                        id: 'premium-johns',
                        name: 'Premium Event Portables',
                        city: 'johns-creek',
                        rating: 4,
                        reviewCount: 56,
                        phone: '(678) 555-9012',
                        location: 'Johns Creek',
                        hours: 'Event Specialists',
                        website: '',
                        badges: [],
                        services: ['Weddings', 'Corporate', 'Premium Service'],
                        reviews: []
                    },
                    {
                        id: 'luxury-jc',
                        name: 'Luxury Portable Restrooms JC',
                        city: 'johns-creek',
                        rating: 5,
                        reviewCount: 91,
                        phone: '(678) 555-3456',
                        location: 'Johns Creek',
                        hours: 'Luxury Specialist',
                        website: '',
                        badges: ['Luxury Certified'],
                        services: ['Luxury Trailers', 'VIP Events', 'High-End Weddings'],
                        reviews: [
                            {
                                name: 'Elizabeth H.',
                                rating: 5,
                                text: 'Absolutely beautiful luxury trailer for our outdoor wedding. Guests were amazed!'
                            }
                        ]
                    },

                    // DULUTH COMPANIES
                    {
                        id: 'patriot-duluth',
                        name: 'Patriot Portables',
                        city: 'duluth',
                        rating: 5,
                        reviewCount: 127,
                        phone: '(678) 456-3488',
                        location: 'Serving Duluth',
                        hours: 'Same Day Delivery Available',
                        website: 'https://patriotportables.com',
                        badges: ['Veteran Owned'],
                        services: ['All Services Available'],
                        reviews: []
                    },
                    {
                        id: 'gwinnett-portable',
                        name: 'Gwinnett Portable Services',
                        city: 'duluth',
                        rating: 4,
                        reviewCount: 74,
                        phone: '(678) 555-7890',
                        location: 'Duluth',
                        hours: 'Mon-Sat',
                        website: '',
                        badges: [],
                        services: ['Construction', 'Events', 'Standard Units'],
                        reviews: [
                            {
                                name: 'Chris W.',
                                rating: 4,
                                text: 'Reliable for construction sites. Fair pricing and consistent service.'
                            }
                        ]
                    },
                    {
                        id: 'duluth-events',
                        name: 'Duluth Event Rentals',
                        city: 'duluth',
                        rating: 5,
                        reviewCount: 88,
                        phone: '(678) 555-1357',
                        location: 'Duluth',
                        hours: 'Event Focus',
                        website: '',
                        badges: [],
                        services: ['Festivals', 'Corporate Events', 'Party Rentals'],
                        reviews: [
                            {
                                name: 'Maria S.',
                                rating: 5,
                                text: 'Perfect for our company festival. They handled everything professionally.'
                            }
                        ]
                    },
                    {
                        id: 'clean-comfort-duluth',
                        name: 'Clean Comfort Portables',
                        city: 'duluth',
                        rating: 4,
                        reviewCount: 62,
                        phone: '(678) 555-2468',
                        location: 'Duluth',
                        hours: 'Daily Service',
                        website: '',
                        badges: [],
                        services: ['Standard Units', 'Hand Wash Stations'],
                        reviews: []
                    },
                    {
                        id: 'superior-duluth',
                        name: 'Superior Sanitation Duluth',
                        city: 'duluth',
                        rating: 5,
                        reviewCount: 93,
                        phone: '(678) 555-3579',
                        location: 'Duluth',
                        hours: '24/7 Service',
                        website: '',
                        badges: ['Family Owned'],
                        services: ['Full Service', 'Emergency Response', 'Long-term Rentals'],
                        reviews: [
                            {
                                name: 'Jose R.',
                                rating: 5,
                                text: 'Outstanding service! They go above and beyond. Family-owned and it shows in their care.'
                            }
                        ]
                    },
                    {
                        id: 'duluth-pro-services',
                        name: 'Duluth Pro Portable Services',
                        city: 'duluth',
                        rating: 4,
                        reviewCount: 47,
                        phone: '(678) 555-8901',
                        location: 'West Duluth',
                        hours: 'Mon-Fri: 8AM-5PM',
                        website: '',
                        badges: [],
                        services: ['Construction', 'Commercial'],
                        reviews: []
                    },

                    // LAWRENCEVILLE COMPANIES
                    {
                        id: 'patriot-lawrenceville',
                        name: 'Patriot Portables',
                        city: 'lawrenceville',
                        rating: 5,
                        reviewCount: 127,
                        phone: '(678) 456-3488',
                        location: 'Serving Lawrenceville',
                        hours: 'Same Day Delivery Available',
                        website: 'https://patriotportables.com',
                        badges: ['Veteran Owned'],
                        services: ['All Services Available'],
                        reviews: []
                    },
                    {
                        id: 'lawrenceville-portable',
                        name: 'Lawrenceville Portable Toilets',
                        city: 'lawrenceville',
                        rating: 4,
                        reviewCount: 71,
                        phone: '(770) 555-8901',
                        location: 'Lawrenceville',
                        hours: 'Mon-Sat: 7AM-6PM',
                        website: '',
                        badges: [],
                        services: ['Construction', 'Residential', 'Commercial'],
                        reviews: [
                            {
                                name: 'William D.',
                                rating: 4,
                                text: 'Good service for our home addition project. Responsive and professional.'
                            }
                        ]
                    },
                    {
                        id: 'gwinnett-county-rentals',
                        name: 'Gwinnett County Rentals',
                        city: 'lawrenceville',
                        rating: 5,
                        reviewCount: 85,
                        phone: '(770) 555-2345',
                        location: 'Lawrenceville',
                        hours: 'Full Service',
                        website: '',
                        badges: [],
                        services: ['Events', 'Construction', 'All Unit Types'],
                        reviews: [
                            {
                                name: 'Nancy K.',
                                rating: 5,
                                text: 'They service all of Gwinnett. Always reliable and clean units.'
                            }
                        ]
                    },
                    {
                        id: 'quick-response-lawrenceville',
                        name: 'Quick Response Portables',
                        city: 'lawrenceville',
                        rating: 4,
                        reviewCount: 59,
                        phone: '(770) 555-6789',
                        location: 'Lawrenceville',
                        hours: 'Fast Service',
                        website: '',
                        badges: [],
                        services: ['Emergency Service', 'Same Day', 'Standard Units'],
                        reviews: []
                    },
                    {
                        id: 'reliable-lawrenceville',
                        name: 'Reliable Restroom Services',
                        city: 'lawrenceville',
                        rating: 5,
                        reviewCount: 96,
                        phone: '(770) 555-0123',
                        location: 'Lawrenceville',
                        hours: '24/7 Available',
                        website: '',
                        badges: ['Top Rated'],
                        services: ['All Services', 'Commercial Focus', 'Long-term Contracts'],
                        reviews: [
                            {
                                name: 'George T.',
                                rating: 5,
                                text: 'We use them for all our commercial construction projects. Never disappointed!'
                            }
                        ]
                    },
                    {
                        id: 'lawrenceville-sanitation',
                        name: 'Lawrenceville Sanitation Pro',
                        city: 'lawrenceville',
                        rating: 4,
                        reviewCount: 53,
                        phone: '(770) 555-4567',
                        location: 'Central Lawrenceville',
                        hours: 'Mon-Fri: 8AM-5PM',
                        website: '',
                        badges: [],
                        services: ['Standard Service', 'Construction Sites'],
                        reviews: []
                    }
                ]
};

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.writeHead(200, CORS).end();
    return;
  }
  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));

  try {
    if (req.method === 'GET') {
      try {
        const meta = await head(BLOB_KEY);
        if (meta) {
          const resp  = await fetch(meta.url);
          const data  = await resp.json();
          // If the stored blob has actual companies, return it
          if (data && data.companies && data.companies.length > 0) {
            res.status(200).json(data);
            return;
          }
          // Otherwise fall through and seed it below
        }
      } catch (_) {
        // Blob doesn't exist yet — will seed below
      }

      // Seed the blob with full defaults so next request reads real data
      try {
        await put(BLOB_KEY, JSON.stringify(DEFAULT_DATA), {
          access: 'public',
          addRandomSuffix: false,
        });
      } catch (_) {
        // If seed write fails, still return the defaults in-memory
      }

      res.status(200).json(DEFAULT_DATA);

    } else if (req.method === 'POST') {
      const data = req.body;
      await put(BLOB_KEY, JSON.stringify(data), {
        access: 'public',
        addRandomSuffix: false,
      });
      res.status(200).json({ success: true });

    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (err) {
    console.error('data.js error:', err);
    res.status(500).json({ error: err.message });
  }
}
