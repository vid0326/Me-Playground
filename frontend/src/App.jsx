import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Profile from './components/Profile';
import Skills from './components/Skills';
import ProjectList from './components/ProjectList';
import Search from './components/Search';


const API_URL = "http://localhost:5000"

function App() {
    const [profile, setProfile] = useState(null);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/profile`);
                if (response.data && response.data.length > 0) {
                    const mainProfile = response.data[0];
                    setProfile(mainProfile);
                    
                    setFilteredProjects(mainProfile.projects || []);
                } else {
                    setError('No profile data found from the API.');
                }
            } catch (err) {
                console.error("Failed to fetch profile data:", err);
                setError('Failed to fetch portfolio data. Is the backend server running?');
            } finally {
                setLoading(false);
            }
        };
        fetchProfileData();
    }, []);

    
    useEffect(() => {
        if (!profile || !profile.projects) return;

        const lowerCaseQuery = searchQuery.toLowerCase();
        const results = profile.projects.filter(project =>
            project.title.toLowerCase().includes(lowerCaseQuery) ||
            project.description.toLowerCase().includes(lowerCaseQuery)
        );
        setFilteredProjects(results);
    }, [searchQuery, profile]); 

    const handleClearSearch = () => {
        setSearchQuery('');
    };

    if (loading) {
        return <div className="text-center text-gray-500 p-8">Loading Portfolio...</div>;
    }
    
    if (error) {
        return <div className="text-center text-red-500 p-8">{error}</div>;
    }

    if (!profile) {
        return <div className="text-center text-gray-500 p-8">No profile available.</div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen font-sans">
            <main className="container mx-auto p-4 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 space-y-8">
                        <Profile profile={profile} />
                        <Skills skills={profile.skills || []} />
                    </div>
                    
                    <div className="lg:col-span-2">
                        <Search 
                            query={searchQuery}
                            onQueryChange={setSearchQuery}
                            onClear={handleClearSearch}
                        />
                        <ProjectList projects={filteredProjects} />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
