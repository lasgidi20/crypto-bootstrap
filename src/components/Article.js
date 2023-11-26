import React from 'react'
import {useEffect, useState} from 'react'
import axios from 'axios'
const Article = () => {
  const [articles, setArticles] = useState([])
  const fetcharticles = async () => {
    const token = localStorage.getItem("token")
    console.log('best')
    console.log(token)
    if (token) {
     const {data} = await axios.get("http://localhost:3000/api/articles", {
        headers: {
            Authorization: token
        }  
     })
     setArticles(data)
    }
  }

  useEffect(() => {
    fetcharticles()
  }, [])

  return (
    <div>{articles.map((article) => {
    return (
    <div className='title' key={article.id}>
     <h2>{article.title}</h2>
    </div>
    )
    })} 
    </div>
  )
}

export default Article