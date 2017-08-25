import React from 'react';
import Header from './Header'
import { Link } from 'react-router-dom'

const NotFound = () => {
	return (
		<div>
			<Header />
        <section className="hednger">
          <div className="dbody">
            <div className="container">
              <div className="container">
                <div className="tdle">
                  <i className="f"></i>
                  404 ops
                </div>
                <Link to='/' className="subtitle">
                  Go Back Home
                </Link>
              </div>
            </div>
          </div>
        </section>
		</div>
	)
}

export default NotFound
