import React from 'react'
import TableDropdown from '../Dropdowns/TableDropdown'
import api from '@/utils/api'

export default function CardRow({title, body,positions, thumbnail, id, handleOpenModal,handleDelete, handleOpenModalDelete}) {


  return (
    <tr>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                  <img
                    src={thumbnail?api.imageUrl(thumbnail):"img/bootstrap.jpg"}
                    className="h-12 w-12 bg-white rounded-full border"
                    alt="..."
                  ></img>{" "}
                  <span
                    className={
                      "ml-3 font-bold "
                    }
                  >
                    {title}
                  </span>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {positions}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs  p-4">
                  {body}
                </td>
                
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <TableDropdown handleOpenModal={handleOpenModal} id={id} handleDelete={handleDelete} handleOpenModalDelete={handleOpenModalDelete} />
                </td>

              </tr>
  )
}
