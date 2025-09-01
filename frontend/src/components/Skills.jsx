import React from 'react';

const Skills = ({ skills }) => {

    const getSkillBarColor = (level) => {
        if (level >= 8) return 'bg-green-500';
        if (level >= 6) return 'bg-blue-500';
        if (level >= 4) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const getSkillBadgeColor = (level) => {
        if (level >= 8) return 'bg-green-100 text-green-800';
        if (level >= 6) return 'bg-blue-100 text-blue-800';
        if (level >= 4) return 'bg-yellow-100 text-yellow-800';
        return 'bg-red-100 text-red-800';
    };
    
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Skills & Technologies ({skills.length})
            </h2>
            
            {skills.length === 0 ? (
                <div className="text-center text-gray-500 p-8">
                    <p>No skills listed in the profile.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {skills.map((skill) => (
                        <div key={skill._id || skill.name} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 flex-1">
                                <span className="font-medium text-gray-700 min-w-0 flex-1">{skill.name}</span>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${getSkillBadgeColor(skill.level)}`}>
                                    Level {skill.level}
                                </span>
                            </div>
                            <div className="w-32 ml-4">
                                <div className="bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full ${getSkillBarColor(skill.level)}`}
                                        style={{ width: `${(skill.level / 10) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            {skills.length > 0 && (
                <div className="mt-6 text-sm text-gray-500">
                    <p>💡 Levels: 1-3 (Beginner), 4-6 (Intermediate), 7-8 (Advanced), 9-10 (Expert)</p>
                </div>
            )}
        </div>
    );
};

export default Skills;