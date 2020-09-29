import Head from 'next/head'
import Link from 'next/link'


import Circle from 'public/images/circle-accent-1.svg'

import courses from 'src/constants/api/courses'

import Header from 'src/parts/Header'
import Hero from 'src/parts/Hero'
import Clients from 'src/parts/Clients'
import ListCourses from 'src/parts/ListCourses'
import ListCategories from 'src/parts/ListCategories'
import Footer from 'src/parts/Footer'


const Home = ({data}) => {
  return (
    <>
      <Head>
        <title>MICROSERVICE</title>
      </Head>

      <main>
        <section className="header-clipping pt-10">
        <Circle className="circle absolute left-0 bottom-0"></Circle>
          <div className="sunshine bottom-0"></div>
          <div className="container mx-auto">
            <Header/>
            <Hero/>
          </div>
        </section>
        <section className="container mx-auto pt-24">
          <Clients/>
        </section>
        <section className="container mx-auto pt-24" >
          <ListCourses data={data}/>
        </section>
        <section className="container mx-auto pt-24" >
          <ListCategories/>
        </section>
        <section className="mt-24 bg-indigo-1000 py-12">
          <Footer/>
        </section>
      </main>
    </>
  )
}

Home.getInitialProps = async () => {
  try {
    const data = await courses.all();
    return { data: data.data };
  } catch (error) {
    return error
  }
}

export default Home