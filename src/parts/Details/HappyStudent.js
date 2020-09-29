import React from 'react'

import Star from 'src/components/Star'

const HappyStudent = ({data}) => {
    return (
        <div className="mt-10">
            <Star value={data?.rating ?? 0} width={26} height={26} ></Star>
            <div className="flex item-center mt-4">
                <div className="rounded-full overflow-hidden">
                    <img className="object-cover w-14 h-14" src={data?.users?.avatar ?? ""} alt={data?.users?.name ?? "student's name"}/>
                </div>
                <div className="ml-4" >
                    <h2 className="text-lg text-gray-900 ">{data?.users?.name ?? "Student's Name "}</h2>
                    <h3 className="text-sm text-gray-600">{data?.users?.role?? "Student's Role"}</h3>
                </div>
            </div>
            <p className="text-gray-600 mt-1">{data?.note ?? "Student's response"}</p>
        </div>
    )
}

export default HappyStudent
