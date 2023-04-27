import Image from 'next/image'
import { Inter } from 'next/font/google'
import Banner from '@/components/Banner'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
<main className='pt-20 min-h-screen'>
 <Banner></Banner>
</main>
  )
}
