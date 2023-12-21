import { useNavigate } from 'react-router-dom'
import React from 'react'

// Получение контактов пользователя после логина
async function getUserContacts() {
  try {
    const token = localStorage.getItem('authToken') || ''
    const requestHeaders = new Headers()

    requestHeaders.set('Content-Type', 'application/json')
    requestHeaders.set('Authorization', token)

    const request = new Request(`${process.env.SERVER_API_URL}/contacts`, {
      method: 'POST',
      body: JSON.stringify({ userid: userID }),
      headers: requestHeaders,
    })

    fetch(request)
      .then((response) => {
        response.json().then((data) => {
          if (data.body != null) {
            const rawData = JSON.parse(data.body)

            rawData.forEach((element) => {
              this.allNotes.push({
                // Переделать
                // noteid: element[0],
                // title: element[1],
                // value: element[2],
                // date: element[3],
                // edited: element[4],
              })
            })

            this.currentContact = this.allNotes[0]
          }
        })
      })
      .catch((error) => {
        console.error(error)
      })
  } catch (error) {
    console.error(error)
  }
}

function Home() {
  return <div></div>
}

export default Home
