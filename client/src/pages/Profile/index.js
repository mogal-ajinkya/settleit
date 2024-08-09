import React from 'react'
import { useSelector } from 'react-redux';
import moment from 'moment';

function Profile() {
    // const {user} = useSelector((state)=>state.user);
    const { user } = useSelector((state) => state.users);
  return (
    <div>
                <div className="flex flex-col w-1/3">
                    <span className='text-xl flex justify-between'>
                        Name : <span className='text-xl'>{user.name} </span>
                    </span>
                    <span className='text-xl flex justify-between'>
                        Email : <span className='text-xl'>{user.email} </span>
                    </span>
                    <span className='text-xl flex justify-between'>
                        Created At : {" "}
                        <b >
                            {moment(user.createdAt).format("MMM D , YYYY hh:mm A")}
                        </b>
                    </span>
                </div>
    </div>
  )
}

export default Profile