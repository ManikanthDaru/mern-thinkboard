import { useState, useEffect } from 'react';

import Navbar from "../components/Navbar.jsx";
import RateLimitedUI from "../components/RateLimitedUI.jsx";
import NoteCard from '../components/NoteCard.jsx';
import NotesNotFound from "../components/NotesNotFound.jsx";
import toast from "react-hot-toast";
import api from "../lib/axios.js";
function HomePage() {

  const [rateLimited, setRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setRateLimited(false);
      }
      catch (err) {
        console.log("Error fetching notes: ", err);
        if (err.response?.status === 429) {
          setRateLimited(true);
        }
        else {
          toast.error("Failed to load notes");
        }
      }
      finally {
        setLoading(false);
      }
    }

    fetchNotes();
  }, []);


  return (
    <div className="min-h-screen">
      <Navbar></Navbar>

      {rateLimited && <RateLimitedUI></RateLimitedUI>}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-ceter text-primary py-10">Loading notes...</div>
        )}

        {notes.length === 0 && !rateLimited && <NotesNotFound />}
        
        {notes.length > 0 && !rateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                setNotes={setNotes}
              ></NoteCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;