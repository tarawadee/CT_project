
import React, { useState,useEffect } from 'react';
import Card from "../components/UI/Card";
import { getdataPost } from '../Firebase/Base'
import axios from 'axios';
function Post(props) {

    const [data, setData] = useState({ covid: [] });
    const [ Post, setPost ] = useState({ post: [] });

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://covid19.th-stat.com/api/open/today',
            );

            setData({
                covid: result.data
            });
        };

        fetchData();
    }, []);
    useEffect(() => {

        const unsubscribe = getdataPost.onSnapshot(ss => {

            let Post = [];

            ss.forEach(document => {

               Post[document.id] = document.data()
            })


            setPost(Post)
        })

        return () => {

            unsubscribe()
        }
    }, [])


    const post = Object.entries(Post).map(([key, value]) => ({key, ...value}));



    return (

        <div className="login-form">


            <Card>
                <h1>
                    NewConfirmed
                    {data.covid.NewConfirmed}

                </h1>
                <p>
                    Recovered
                    {data.covid.Recovered}
                </p>
                <p>
                    Confirmed
                    {data.covid.Confirmed}
                </p>
                <p>
                    {data.covid.Hospitalized}
                </p>

                <h5>
                    {data.covid.Deaths}
                </h5>
            </Card>
            <div>
                { post.map( post => (
                    <Card key={post}>
                        <h1>{post.title}</h1>
                        <p>{post.tag}</p>
                        <p>{post.detail}</p>
                    </Card>
                    ))}
            </div>


        </div>
    );
}

export default Post;