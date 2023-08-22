import Head from 'next/head'
import Image from 'next/image'
import Header from '@/util/header'
import styles from '@/styles/Home.module.css'
import Person from '../util/person.png'
import Link from 'next/link'



export default function Home() {
  return (
    <>
    <Header/>
    <div className='py-4 h-[90vh] flex flex-wrap '>
<div className='px-[5rem] mt-[9rem] min-w-[300px]'>
  <h5 className='text-white text-[3rem] md:text-[4rem] font-bold '>Your child<br></br> is a <span className='underline decoration-wavy underline-offset-8 text-primarycolor decoration-4 p-2 '>Hero !</span> </h5>
  <p className='text-[#717377] md:text-[2rem] text-[1rem] mb-8'>Join them in our XYZ school</p>
  <Link href="/login" className='bg-white ml-4  no-underline text-secoundblack  px-[2rem] py-[1rem] rounded-[30px] font-bold'>Start Now </Link>
</div>
<div className='w-[500px]'>
<Image src={Person} width={600} height={900} alt="jdjd"/>
</div>
    </div>
    </>
  )
}
