import React from 'react'
import Link from 'next/link'
import RenderItem from './RenderItem'


const ListCourses = ({data}) => {
    return (
        <>
            <div className="flex justify-between items-center">
                <div className="w-auto">
                    <h2 className="text-lg text-gray-600">New Classes</h2>
                    <h3 className="text-lg text-gray-900">
                        Summer <span className="text-teal-400">Productive</span>
                    </h3>
                </div>
                <div className="w-auto">
                    <Link href="/courses" ><a className="text-gray-600 hover:underline text-sm" >View All Courses</a></Link>
                </div>
            </div>
            <div className="flex justify-start items-center -mx-4 mt-6">
                {
                    data?.length > 0 ? (
                        data.map((item, index) => {
                            return <RenderItem item={item} key={index}/>
                        })
                    ) : <div className="w-full text-center py-12 ">No Item Found</div>
                }
            </div>
        </>
    )
}

export default ListCourses