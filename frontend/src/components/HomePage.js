import React from 'react';

function HomePage({ data }) {
    return (
        <div className="container d-flex flex-column align-items-center mt-4" style={{ backgroundColor: '#f7f9fc', padding: '20px', borderRadius: '10px' }}>
            <h1 className="text-center" style={{ color: '#6c757d' }}>Home Page</h1>
            <p style={{ color: '#495057', textAlign: 'center' }}>{data}</p>
        </div>
    );
}

export default HomePage;
