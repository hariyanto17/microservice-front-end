import React, {useEffect, useState, useRef} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import courses from 'src/constants/api/courses'

import Header from 'src/parts/Header';
import Footer from 'src/parts/Footer';
import ListCourses from 'src/parts/ListCourses';
import index from 'src/parts/ListCategories';


const Courses = ({data}) => {

    const [search, setSearch] = useState(() => "")
    const [searchFocus, setSearchFocus] = useState(() => false)
    const [SearchResponse, setSearchResponse] = useState(() => ({
        isLoading: false,
        isError: false,
        data: [],
      }));


    const selectWrapper = useRef(null)

    const clickOutside = (event) => {
        if(selectWrapper && !selectWrapper.current.contains(event.target)){
            setSearch("")
        }
    }

    let timeoutSearch = useRef(null)
    const handleSearch = (e) => {
        e.persist()
        setSearch(e.target.value)
        clearTimeout(timeoutSearch.current)
        timeoutSearch.current = setTimeout(() => {
            setSearchResponse({
                isLoading: true,
                isError: false,
                data: null
            })
        courses.all({params: {q:e.target.value}})
        .then((res) => {
            setSearchResponse({
                isLoading: false,
                isError: false,
                data: res.data
            })
        }).catch(err => {
            setSearchResponse({
                isLoading: false,
                isError: true,
                data: null
            })
        })
        }, 1000)
    }

    useEffect(() => {
        window.addEventListener("mousedown", clickOutside);
        return () => {
          window.removeEventListener("mousedown", clickOutside);
        };
      }, []);

    return (
        <>
            <Head>
                <title>Micro | Courses</title>
            </Head>

            <section className="pt-10 z-30 relative" style={{height:360}}>
                <div className="absolute inset-0 z-0 w-full bg-black opacity-75">
                    <div className="meta-title absolute bottom-0 object-fill z-0 w-full flex justify-center items-center" style={{marginBottom : "-25px"}}>
                        <div>
                            <h3 className="text-6xl text-center text-teal-500 font-semibold" >
                                Library
                            </h3>
                            <h4 className="text-lg text-center text-white">
                                Jangan mau kalah update dengan yang lainya. <br/> Yuk ikuti perkembangan Teknologi.
                            </h4>
                            <div className="flex flex-col relative" ref={selectWrapper} >
                                <input
                                    id="q"
                                    onChange={handleSearch}
                                    onFocus={() => setSearchFocus(!searchFocus)}
                                    onBlur={() => setSearchFocus(!searchFocus)}
                                    value={search}
                                    placeholder={
                                        searchFocus ?
                                        "ketik minimal 3 karakter" : 
                                        "Lagi nyari kelas apa?"
                                    }
                                    type="text" 
                                    className="bg-white focus:outline-none transition-all duration-200 focus:border-teal-500 border border-gray-600 px-4 py-3 w-full mt-6"
                                />
                                {search.length >= 3 && (
                                    <div 
                                        className="flex flex-col absolute py-2 px-4 bg-white border border-gray-600 w-full"
                                        style={{top:75}}
                                    >
                                        {
                                            SearchResponse.isLoading ? "Loading . . ." :
                                            <>
                                            {
                                                SearchResponse.isError && "Something is technikali Wrong"
                                            }
                                            {
                                                 SearchResponse.data.length > 0 ?
                                                SearchResponse.data.map((item, index ) => {
                                                    console.log(item)
                                                    return (
                                                        <div
                                                            key={index} 
                                                            className="flex items-center -mx-4 py-2 cursor-pointer hover:bg-gray-200 relative"
                                                        >
                                                            <div className="w-auto px-4" style={{width:150}} >
                                                                <img src={item?.thumbnail ?? ""} alt={item?.name ?? "Corse Name"}/>
                                                            </div>
                                                            <div className="w-full px-4">
                                                            <h6 className="text-gray-900 text-lg">{item?.name ?? "Course Name"}</h6>
                                                            <p className="text-gray-600" >{item?.level ?? "Level"}</p>
                                                            <Link href="/courses/[id]" as={`/courses/${item.id}`} ><a className="link-wrapped"></a></Link>
                                                            </div>
                                                        </div>
                                                    )
                                                }) : "No Courses Fount"
                                            } 
                                            </>
                                            
                                        }
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto z-10 relative">
                    <Header/>
                </div>
            </section>
            <section className="container mx-auto pt-24" >
                <ListCourses data={data}/>
            </section>
            <section className="mt-24 bg-indigo-1000 py-12">
                <Footer/>
            </section>
        </>
    )
}

Courses.getInitialProps = async () => {
    try {
        const data = await courses.all();
        return { data: data.data };
      } catch (error) {
        return error
      }
}
export default Courses