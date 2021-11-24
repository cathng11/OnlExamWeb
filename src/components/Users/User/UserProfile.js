import React from 'react'
import Profile from '../../Profile/Profile'

export default function UserProfile() {
    const data = {
        avatar:'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.6435-9/241770255_4005059492936002_930572996519637531_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=730e14&_nc_ohc=xEuGQHeUpoIAX9FxWut&_nc_ht=scontent.fhan2-4.fna&oh=1140c64bd604e70d15dac20c0384912f&oe=61940A84',
        userId: '102922888',
        firstName: 'Lit',
        lastName: 'Nguyen',
        email: 'litngungok@gmail.com',
        city: 'DaNang',
        phone: '0932491405',
        gender: '1',
        role: 'Student'
    }
    return (
        <Profile data={data} view={"UserProfile"}/>
    )
}
