import React from 'react';

const Profile = ({ profile }) => {
   
    const name = profile.name || "User";
    const email = profile.email || "No email provided";
    const education = profile.education || [];
    const work = profile.work || [];
    const links = profile.links || {};

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {name.charAt(0).toUpperCase()}
                </div>
                <div className="ml-4">
                    <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
                    <p className="text-gray-600">{email}</p>
                </div>
            </div>

            {/* Education Section */}
            {education.length > 0 && (
                <div className="mb-6">
                    <h3 className="font-semibold text-gray-700 mb-2 border-b pb-1">Education</h3>
                    <div className="space-y-2">
                        {education.map((edu, index) => (
                            <div key={index}>
                                <p className="font-bold text-gray-800">{edu.institution}</p>
                                <p className="text-sm text-gray-600">{edu.degree} ({edu.year})</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            {/* Work Section */}
            {work.length > 0 && (
                 <div className="mb-6">
                    <h3 className="font-semibold text-gray-700 mb-2 border-b pb-1">Work Experience</h3>
                    <div className="space-y-2">
                        {work.map((job, index) => (
                             <div key={index}>
                                <p className="font-bold text-gray-800">{job.company} - <span className="font-normal">{job.role}</span></p>
                                <p className="text-sm text-gray-500">{new Date(job.start).getFullYear()} - {job.end ? new Date(job.end).getFullYear() : 'Present'}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Links Section */}
            <div>
                <h3 className="font-semibold text-gray-700 mb-2">Links</h3>
                <div className="flex flex-wrap gap-2">
                    {links.github && <a href={links.github} target="_blank" rel="noopener noreferrer" className="bg-gray-800 text-white px-3 py-1 rounded text-sm hover:bg-gray-700">GitHub</a>}
                    {links.linkedin && <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-500">LinkedIn</a>}
                    {links.leetcode && <a href={links.leetcode} target="_blank" rel="noopener noreferrer" className="bg-yellow-500 text-black px-3 py-1 rounded text-sm hover:bg-yellow-400">LeetCode</a>}
                    
                    {!links.github && !links.linkedin && !links.leetcode && <span className="text-gray-500 text-sm">No links available</span>}
                </div>
            </div>
        </div>
    );
};

export default Profile;