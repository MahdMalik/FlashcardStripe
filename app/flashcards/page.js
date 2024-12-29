'use client'
import { useState, useEffect } from 'react'
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Stack
} from '@mui/material'

import { useUser } from '@clerk/nextjs'
import { signInWithCustomToken } from 'firebase/auth';
import { auth } from '/firebase'; // Adjust the path as necessary
import { useRouter } from 'next/navigation'

import {db} from '/firebase'
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
  addDoc,
  writeBatch
} from 'firebase/firestore'

export default function Flashcards() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [flashcards, setFlashcards] = useState([])
  const router = useRouter()

  const authenticateWithFirebase = async(firebaseCustomToken) => {
      try
      {
        await signInWithCustomToken(auth, firebaseCustomToken)
        console.log("User authenticated with firebase")
      }
      catch(error)
      {
        console.error("Error signing in with firebase custom token: ", error.code, error.message)
      }
    }

  const getToken = async(user) => {
    const userId = user.id
    const response = await fetch('/api/firebase_data_stuff', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({clerkUserId: userId})
    })
    const data = await response.json()
    if(data.firebaseCustomToken)
    {
      const firebaseToken = data.firebaseCustomToken;
      await authenticateWithFirebase(firebaseToken)
    }
    return
  }

  const handleCardClick = (id) => {
    router.push(`/flashcard?id=${id}`)
  }

  useEffect(() => {
    async function getFlashcards() {
      if (!user) return
      await getToken(user)
      const docRef = doc(collection(db, 'users'), user.id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const collections = docSnap.data().flashcardSets || []
        setFlashcards(collections)
      } else {
        await setDoc(docRef, { flashcards: [] })
      }
    }
    getFlashcards()
  }, [user])
  return (
    <Container maxWidth="md">
      <Stack direction="row">
        <Typography variant="h5" component="h2"> Owned Flashcard Sets</Typography>
        <Button color="inherit" href="/" style={{ flexGrow: .5 }}>Home</Button>
      </Stack>
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {flashcards.map((flashcard, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {flashcard.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}