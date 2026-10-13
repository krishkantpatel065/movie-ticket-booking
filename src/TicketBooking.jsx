import { useState } from 'react';
import './TicketBooking.css';

function TicketBooking() {
  const [users, setUsers] = useState([]);
  const [seatNumber, setSeatNumber] = useState('');
  const [searchSeat, setSearchSeat] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');

  function handleBooking(e) {
    e.preventDefault();

    const cleanName = name.trim();
    const cleanSeat = seatNumber.trim().toUpperCase();

    if (!cleanName || !cleanSeat) {
      setMessageType('error');
      setMessage('Please enter both your name and seat number.');
      return;
    }

    const alreadyBooked = users.some(
      (user) => user.seatNumber.toLowerCase() === cleanSeat.toLowerCase()
    );

    if (alreadyBooked) {
      setMessageType('error');
      setMessage(`Seat ${cleanSeat} is already booked. Please select another seat.`);
      return;
    }

    const newUser = {
      id: Date.now(),
      name: cleanName,
      seatNumber: cleanSeat,
    };

    setUsers((prev) => [...prev, newUser]);
    setName('');
    setSeatNumber('');
    setMessageType('success');
    setMessage(`Great! Seat ${cleanSeat} has been booked successfully.`);
  }

  const filteredUsers = users.filter((user) => {
    const query = searchSeat.trim().toLowerCase();

    return (
      user.seatNumber.toLowerCase().includes(query) ||
      user.name.toLowerCase().includes(query)
    );
  });

  function clearSearch() {
    setSearchSeat('');
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a href="#" className="brand">
          <span className="brand-icon">S</span>
          <span>Seat<span className="brand-light">Flow</span></span>
        </a>

        <span className="topbar-label">
          <span className="status-dot" />
          Booking Management
        </span>
      </header>

      <section className="dashboard">
       {/*  <div className="welcome-section">
          <div>
            <span className="eyebrow">BOOKING DASHBOARD</span>
            <h1>Manage your seats<span className="heading-dot">.</span></h1>
            <p className="subtitle">
              Book a seat, keep track of reservations, and find bookings instantly.
            </p>
          </div>

          <div className="date-chip">
            <span className="calendar-icon">▦</span>
            Seat Reservation
          </div>
        </div>*/}

        <div className="stats-grid">
          <article className="stat-card">
            <div className="stat-top">
              <span className="stat-icon blue-icon">▤</span>
              <span className="stat-caption">ALL TIME</span>
            </div>
            <p className="stat-label">Total Bookings</p>
            <div className="stat-bottom">
              <span className="stat-number">{users.length}</span>
              <span className="stat-description">reservations</span>
            </div>
          </article>

          <article className="stat-card">
            <div className="stat-top">
              <span className="stat-icon green-icon">✓</span>
              <span className="stat-caption">CURRENT</span>
            </div>
            <p className="stat-label">Seats Reserved</p>
            <div className="stat-bottom">
              <span className="stat-number">{users.length}</span>
              <span className="stat-description">confirmed</span>
            </div>
          </article>

          <article className="stat-card">
            <div className="stat-top">
              <span className="stat-icon purple-icon">⌕</span>
              <span className="stat-caption">LIVE SEARCH</span>
            </div>
            <p className="stat-label">Matching Results</p>
            <div className="stat-bottom">
              <span className="stat-number">{filteredUsers.length}</span>
              <span className="stat-description">bookings found</span>
            </div>
          </article>
        </div>

        <div className="main-grid">
          <section className="panel booking-panel">
            <div className="panel-heading">
              <div className="panel-icon">＋</div>
              <div>
                <h2>Reserve a seat</h2>
                <p>Enter the passenger details below.</p>
              </div>
            </div>

            <form className="booking-form" onSubmit={handleBooking}>
              <div className="field-group">
                <label htmlFor="userName">Passenger name</label>
                <input
                  id="userName"
                  type="text"
                  placeholder="e.g. Alex Johnson"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  maxLength={100}
                />
              </div>

              <div className="field-group">
                <label htmlFor="seatNumber">Seat number</label>
                <input
                  id="seatNumber"
                  type="text"
                  placeholder="e.g. A1, B12, C5"
                  value={seatNumber}
                  onChange={(e) => setSeatNumber(e.target.value)}
                  maxLength={10}
                />
                <span className="field-hint">
                  Enter the seat identifier you want to reserve.
                </span>
              </div>

              <button className="primary-button" type="submit">
                Confirm Reservation <span>→</span>
              </button>
            </form>

            {message && (
              <div
                className={`feedback ${messageType}`}
                role="status"
                aria-live="polite"
              >
                <span className="feedback-icon">
                  {messageType === 'success' ? '✓' : '!'}
                </span>
                <span>{message}</span>
                <button
                  type="button"
                  className="dismiss-button"
                  onClick={() => setMessage('')}
                  aria-label="Dismiss message"
                >
                  ×
                </button>
              </div>
            )}

            <div className="helper-card">
              <span className="helper-icon">i</span>
              <p>
                Each seat can only be reserved once. Search by passenger name
                or seat number to find a booking.
              </p>
            </div>
          </section>

          <section className="panel reservations-panel">
            <div className="reservations-heading">
              <div>
                <span className="eyebrow">RESERVATION RECORDS</span>
                <h2>Booked seats</h2>
                <p>Your passenger reservation list.</p>
              </div>
              <span className="count-badge">{users.length}</span>
            </div>

            <div className="search-box">
              <span className="search-icon" aria-hidden="true">⌕</span>
              <input
                type="search"
                aria-label="Search bookings"
                placeholder="Search name or seat..."
                value={searchSeat}
                onChange={(e) => setSearchSeat(e.target.value)}
              />
              {searchSeat && (
                <button
                  type="button"
                  className="clear-search"
                  onClick={clearSearch}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            {filteredUsers.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  {users.length === 0 ? '▤' : '⌕'}
                </div>
                <h3>
                  {users.length === 0
                    ? 'No bookings yet'
                    : 'No matching bookings'}
                </h3>
                <p>
                  {users.length === 0
                    ? 'Your new reservations will appear here.'
                    : 'Try another passenger name or seat number.'}
                </p>
                {searchSeat && (
                  <button
                    type="button"
                    className="text-button"
                    onClick={clearSearch}
                  >
                    Clear search
                  </button>
                )}
              </div>
            ) : (
              <div className="reservation-list">
                {filteredUsers.map((user) => (
                  <article className="reservation-item" key={user.id}>
                    <div className="avatar">
                      {user.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="passenger-info">
                      <h3>{user.name}</h3>
                      <p>
                        <span className="mini-status" />
                        Confirmed reservation
                      </p>
                    </div>

                    <div className="seat-info">
                      <span className="seat-label">SEAT</span>
                      <span className="seat-badge">{user.seatNumber}</span>
                    </div>
                  </article>
                ))}
              </div>
            )}

            <div className="list-footer">
              <span>Showing {filteredUsers.length} of {users.length} bookings</span>
              <span className="footer-status">
                <span className="status-dot" /> Up to date
              </span>
            </div>
          </section>
        </div>

      </section>
    </main>
  );
}
export default TicketBooking;