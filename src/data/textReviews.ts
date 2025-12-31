export type FBStyleReview = {
  id: string;
  name: string;
  date: string; // e.g., "Sep 27"
  content: string; // review text
  avatar: string; // replace with your Cloudinary link per review
};

// Tip:
// - Edit only the `content` fields later to add real text
// - You can also change `name` and `date` if you want
// - Avatar uses pravatar.cc. To change, replace the URL with a custom image URL

export const fbReviews: FBStyleReview[] = [
  {
    id: 'fb-18',
    name: 'Karim Uddin',
    date: 'Dec 15',
    content: 'গিয়ার লিভার স্লিভটা অনেক ভালো! জুতায় দাগ পড়া বন্ধ হয়েছে, এখন আর চিন্তা করতে হয় না। ইনস্টল করা খুব সহজ, কোনো টুল লাগে না।',
    avatar: 'https://res.cloudinary.com/dgm2mosta/image/upload/v1761759847/photo-1609091687365-69a871804923_rgggzv.avif'
  },
  {
    id: 'fb-19',
    name: 'Rifat Ahmed',
    date: 'Dec 12',
    content: 'Best purchase for my bike! Gear shifting onek comfortable hoyeche. Shoe ta protect hoy, scratch o hoy na. Quality excellent, price reasonable.',
    avatar: 'https://res.cloudinary.com/dgm2mosta/image/upload/v1761759849/photo-1629301085063-215c20bae215_n6iwqk.avif'
  },
  {
    id: 'fb-20',
    name: 'Tania Rahman',
    date: 'Dec 10',
    content: 'আমার স্বামীর জন্য কিনেছি। তিনি বলেছেন গিয়ার বদলানো এখন অনেক আরামদায়ক। সিলিকন স্লিভটা স্লিপ করে না, গ্রিপ খুব ভালো।',
    avatar: 'https://res.cloudinary.com/dgm2mosta/image/upload/v1761759854/photo-1727934403995-90cd67a658ed_wgkgmg.avif'
  },
  {
    id: 'fb-21',
    name: 'Sajib Hasan',
    date: 'Dec 08',
    content: 'Daily commute korar jonno perfect! Juta protect hoy, gear change smooth. Installation 2 minute e sesh. Highly recommended for bikers.',
    avatar: 'https://res.cloudinary.com/dgm2mosta/image/upload/v1761759852/photo-1532284166236-8a7bb97578e9_gmxhoh.avif'
  },
  {
    id: 'fb-22',
    name: 'Nazmul Hossain',
    date: 'Dec 05',
    content: 'সিলিকন রাবার স্লিভটা আমার হন্ডায় পারফেক্ট ফিট হয়েছে। জুতায় স্ক্র্যাচ আর দাগ পড়া বন্ধ হয়েছে। গিয়ার বদলানো এখন অনেক সহজ।',
    avatar: 'https://res.cloudinary.com/dgm2mosta/image/upload/v1761759851/photo-1667842793062-9344ef8973b0_wk741z.avif'
  },
  {
    id: 'fb-23',
    name: 'Fahima Akter',
    date: 'Dec 03',
    content: 'Brother er jonno nisi. O bole quality khub bhalo, shoe protect hoy, gear shift comfortable. Delivery fast, packaging good.',
    avatar: 'https://res.cloudinary.com/dgm2mosta/image/upload/v1761759850/photo-1650603698444-34fc6ab53313_kevgef.avif'
  },
  {
    id: 'fb-24',
    name: 'Mahmudul Islam',
    date: 'Dec 01',
    content: 'আমার নতুন জুতায় দাগ পড়া শুরু হয়েছিল। এই স্লিভটা লাগানোর পর থেকে আর কোনো সমস্যা নেই। সিলিকন ম্যাটেরিয়াল খুব টেকসই।',
    avatar: 'https://res.cloudinary.com/dgm2mosta/image/upload/v1761759851/photo-1670400273456-583a44d9c8ab_adkbky.avif'
  },
  {
    id: 'fb-25',
    name: 'Anika Chowdhury',
    date: 'Nov 28',
    content: 'Husband er bike e lagaisi. O khub satisfied. Gear lever e perfect fit, slip hoy na, grip excellent. Value for money product.',
    avatar: 'https://res.cloudinary.com/dgm2mosta/image/upload/v1761759849/546698017_17936389284080420_4556473209659674013_n_deevbw.jpg'
  },
  {
    id: 'fb-26',
    name: 'Sohel Rana',
    date: 'Nov 25',
    content: 'সব ধরনের মোটরসাইকেলে কাজ করে। আমার বাইকে লাগিয়েছি, পারফেক্ট ফিট হয়েছে। জুতার সুরক্ষা নিশ্চিত, গিয়ার শিফটিং আরামদায়ক।',
    avatar: 'https://res.cloudinary.com/dgm2mosta/image/upload/v1761759848/photo-1627610699236-c5294a233329_vh34pb.avif'
  },
  {
    id: 'fb-27',
    name: 'Rashida Begum',
    date: 'Nov 22',
    content: 'Son er jonno kinechi. O bole bike chalate onek comfortable. Shoe protect hoy, scratch free. Quality bhalo, price reasonable.',
    avatar: 'https://res.cloudinary.com/dgm2mosta/image/upload/v1761759847/480810661_668108258904254_3141714697303030698_n_iy9qrc.jpg'
  },
  {
    id: 'fb-28',
    name: 'Asif Iqbal',
    date: 'Nov 20',
    content: 'গিয়ার লিভার স্লিভটা ব্যবহার করে খুবই সন্তুষ্ট। ইনস্টলেশন সহজ, কোনো টুল লাগে না। জুতায় দাগ পড়া বন্ধ হয়েছে, গিয়ার বদলানো আরামদায়ক।',
    avatar: 'https://res.cloudinary.com/dgm2mosta/image/upload/v1761759856/photo-1728392001681-43c57e5318a7_d6ce0h.avif'
  }
];


