
import { useEffect, useMemo, useState } from 'react'
import './App.css'

const starterObjects = [
  {
    id: 1,
    name: 'Nintendo Switch',
    location: 'Bedroom closet',
    notes: 'Put here so I remember where I stored it.',
    category: 'Electronics',
    emoji: '🎮',
    updatedAt: 'Recently added',
  },
  {
    id: 2,
    name: 'Spare Keys',
    location: 'Desk drawer',
    notes: 'Backup keys for the house.',
    category: 'Household',
    emoji: '🔑',
    updatedAt: 'Recently added',
  },
  {
    id: 3,
    name: 'PS5 Controller',
    location: 'TV stand',
    notes: "Kept here when I'm not using it.",
    category: 'Electronics',
    emoji: '🕹️',
    updatedAt: 'Recently added',
  },
]

const categories = ['Electronics', 'Household', 'Documents', 'Clothing', 'Other']

function readSavedObjects() {
  try {
    const saved = localStorage.getItem('placeback-objects')
    return saved ? JSON.parse(saved) : starterObjects
  } catch {
    return starterObjects
  }
}

function App() {
  const [objects, setObjects] = useState(readSavedObjects)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [view, setView] = useState('home')
  const [editingId, setEditingId] = useState(null)
  const [selectedObject, setSelectedObject] = useState(null)
  const [notice, setNotice] = useState('')

  const [form, setForm] = useState({
    name: '',
    location: '',
    notes: '',
    category: 'Other',
    emoji: '📦',
  })

  useEffect(() => {
    try {
      localStorage.setItem('placeback-objects', JSON.stringify(objects))
    } catch {
      setNotice('Could not save to browser storage.')
    }
  }, [objects])

  const filteredObjects = useMemo(() => {
    const query = search.trim().toLowerCase()

    return objects.filter((item) => {
      const matchesSearch = [
        item.name,
        item.location,
        item.notes,
        item.category,
      ].some((value) => (value || '').toLowerCase().includes(query))

      const matchesCategory =
        categoryFilter === 'All' || item.category === categoryFilter

      return matchesSearch && matchesCategory
    })
  }, [objects, search, categoryFilter])

  function openAddForm() {
    setEditingId(null)
    setSelectedObject(null)
    setForm({
      name: '',
      location: '',
      notes: '',
      category: 'Other',
      emoji: '📦',
    })
    setNotice('')
    setView('form')
  }

  function openEditForm(item) {
    setEditingId(item.id)
    setSelectedObject(null)
    setForm({
      name: item.name,
      location: item.location,
      notes: item.notes,
      category: item.category,
      emoji: item.emoji || '📦',
    })
    setNotice('')
    setView('form')
  }

  function updateForm(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function saveObject(event) {
    event.preventDefault()

    const cleanObject = {
      ...form,
      name: form.name.trim(),
      location: form.location.trim(),
      notes: form.notes.trim(),
    }

    if (!cleanObject.name || !cleanObject.location) {
      setNotice('Please enter an object name and location.')
      return
    }

    if (editingId !== null) {
      setObjects((current) =>
        current.map((item) =>
          item.id === editingId ? { ...item, ...cleanObject } : item
        )
      )
      setNotice('Object updated successfully.')
    } else {
      setObjects((current) => [
        { ...cleanObject, id: Date.now(), updatedAt: 'Just added' },
        ...current,
      ])
      setNotice('Object added successfully.')
    }

    setSearch('')
    setCategoryFilter('All')
    setView('home')
    setEditingId(null)
  }

  function deleteObject(id) {
    const confirmed = window.confirm('Delete this object from PlaceBack?')
    if (!confirmed) return

    setObjects((current) => current.filter((item) => item.id !== id))
    setSelectedObject(null)
    setView('home')
    setNotice('Object deleted.')
  }

  function showHome() {
    setView('home')
    setSelectedObject(null)
    setEditingId(null)
  }

  const pageTitle =
    view === 'form'
      ? editingId !== null ? 'Edit Object' : 'Add Object'
      : view === 'details'
        ? 'Object Details'
        : view === 'locations'
          ? 'My Locations'
          : view === 'reminders'
            ? 'Notes & Reminders'
            : 'My Objects'

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <button className="brand" onClick={showHome} aria-label="PlaceBack home">
          <span className="brand-icon">P</span>
          <span>
            <strong>PlaceBack</strong>
            <small>Find your things.</small>
          </span>
        </button>

        <p className="nav-label">WORKSPACE</p>

        <nav className="main-nav">
          <button
            className={`nav-item ${view === 'home' ? 'active' : ''}`}
            onClick={showHome}
          >
            <span>⌂</span> Dashboard
          </button>
          <button
            className={`nav-item ${view === 'locations' ? 'active' : ''}`}
            onClick={() => {
              setSelectedObject(null)
              setView('locations')
            }}
          >
            <span>⌖</span> Locations
          </button>
          <button
            className={`nav-item ${view === 'reminders' ? 'active' : ''}`}
            onClick={() => {
              setSelectedObject(null)
              setView('reminders')
            }}
          >
            <span>▤</span> Notes & Reminders
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-tip">
            <span className="tip-icon">✦</span>
            <strong>Stay organized</strong>
            <p>Save where things belong so you can find them when you need them.</p>
          </div>
          <p className="sidebar-footer">PlaceBack · Sprint 1</p>
        </div>
      </aside>

      <div className="main-area">
        <header className="topbar">
          <div className="breadcrumb">Workspace <span>/</span> {pageTitle}</div>
          <div className="profile">
            <span className="profile-avatar">G</span>
            <span className="profile-name">My Workspace</span>
          </div>
        </header>

        <main className="page-content">
          {notice && (
            <div className="notice" role="status">
              <span>{notice}</span>
              <button onClick={() => setNotice('')} aria-label="Dismiss message">×</button>
            </div>
          )}

          {view === 'form' ? (
            <>
              <div className="page-heading">
                <div>
                  <p className="eyebrow">YOUR COLLECTION</p>
                  <h1>{editingId !== null ? 'Edit your object' : 'Add a new object'}</h1>
                  <p className="page-subtitle">
                    Keep track of what it is and exactly where you put it.
                  </p>
                </div>
                <button className="button button-secondary" onClick={showHome}>
                  ← Back to objects
                </button>
              </div>

              <form className="form-card" onSubmit={saveObject}>
                <div className="form-section-title">
                  <span className="form-section-icon">📦</span>
                  <div>
                    <h2>Object information</h2>
                    <p>Fields marked with * are required.</p>
                  </div>
                </div>

                <label className="field">
                  Object name *
                  <input
                    name="name"
                    value={form.name}
                    onChange={updateForm}
                    placeholder="e.g. Nintendo Switch"
                    required
                    autoFocus
                  />
                </label>

                <label className="field">
                  Where did you put it? *
                  <input
                    name="location"
                    value={form.location}
                    onChange={updateForm}
                    placeholder="e.g. Bedroom closet, top shelf"
                    required
                  />
                </label>

                <label className="field">
                  Category
                  <select name="category" value={form.category} onChange={updateForm}>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </label>

                <label className="field">
                  Notes
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={updateForm}
                    placeholder="Add helpful details, or explain why you put it there..."
                    rows="4"
                  />
                </label>

                <label className="field">
                  Choose an icon
                  <select name="emoji" value={form.emoji} onChange={updateForm}>
                    <option value="📦">📦 Box</option>
                    <option value="🎮">🎮 Gaming</option>
                    <option value="🔑">🔑 Keys</option>
                    <option value="💻">💻 Electronics</option>
                    <option value="📄">📄 Documents</option>
                    <option value="👕">👕 Clothing</option>
                    <option value="🧰">🧰 Tools</option>
                    <option value="🎒">🎒 Bags</option>
                  </select>
                </label>

                <div className="form-actions">
                  <button type="button" className="button button-secondary" onClick={showHome}>
                    Cancel
                  </button>
                  <button type="submit" className="button button-primary">
                    {editingId !== null ? 'Save Changes' : '＋ Save Object'}
                  </button>
                </div>
              </form>
            </>
          ) : view === 'details' && selectedObject ? (
            <>
              <div className="page-heading">
                <div>
                  <p className="eyebrow">YOUR COLLECTION</p>
                  <h1>{selectedObject.name}</h1>
                  <p className="page-subtitle">Here are the details for your saved object.</p>
                </div>
                <button className="button button-secondary" onClick={showHome}>← Back</button>
              </div>
              <section className="detail-card">
                <div className="detail-illustration">{selectedObject.emoji || '📦'}</div>
                <div className="detail-content">
                  <span className="category-pill">{selectedObject.category}</span>
                  <h2>{selectedObject.name}</h2>
                  <p className="detail-location">📍 {selectedObject.location}</p>
                  <h3>Notes</h3>
                  <p>{selectedObject.notes || 'No notes have been added yet.'}</p>
                  <div className="form-actions">
                    <button className="button button-secondary" onClick={() => openEditForm(selectedObject)}>
                      Edit object
                    </button>
                    <button className="button button-danger" onClick={() => deleteObject(selectedObject.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </section>
            </>
          ) : view === 'locations' ? (
            <>
              <div className="page-heading">
                <div>
                  <p className="eyebrow">YOUR SPACE</p>
                  <h1>My Locations</h1>
                  <p className="page-subtitle">See where your belongings are stored.</p>
                </div>
              </div>
              <section className="location-grid">
                {[...new Set(objects.map((item) => item.location.trim()).filter(Boolean))].map((location) => (
                  <button
                    className="location-card"
                    key={location}
                    onClick={() => {
                      setSearch(location)
                      setCategoryFilter('All')
                      setView('home')
                    }}
                  >
                    <span className="location-icon">📍</span>
                    <strong>{location}</strong>
                    <span>{objects.filter((item) => item.location.trim() === location).length} saved object(s)</span>
                  </button>
                ))}
                {objects.length === 0 && <p className="empty-state">Add an object to start building your locations.</p>}
              </section>
            </>
          ) : view === 'reminders' ? (
            <>
              <div className="page-heading">
                <div>
                  <p className="eyebrow">DON'T FORGET</p>
                  <h1>Notes & Reminders</h1>
                  <p className="page-subtitle">Review the notes you've saved with your belongings.</p>
                </div>
                <button className="button button-primary" onClick={openAddForm}>＋ Add Object</button>
              </div>
              <div className="notes-list">
                {objects.filter((item) => item.notes.trim()).map((item) => (
                  <button
                    className="note-row"
                    key={item.id}
                    onClick={() => {
                      setSelectedObject(item)
                      setView('details')
                    }}
                  >
                    <span className="note-icon">{item.emoji || '📦'}</span>
                    <span className="note-text">
                      <strong>{item.name}</strong>
                      <span>{item.notes}</span>
                    </span>
                    <span className="note-location">📍 {item.location}</span>
                  </button>
                ))}
                {objects.every((item) => !item.notes.trim()) && (
                  <p className="empty-state">No notes yet. Add an object with a note to see it here.</p>
                )}
              </div>
              <p className="helper-text">These are saved notes, not scheduled notifications yet.</p>
            </>
          ) : (
            <>
              <section className="welcome-banner">
                <div className="welcome-copy">
                  <span className="welcome-label">YOUR PERSONAL ORGANIZER</span>
                  <h1>Everything has a place.</h1>
                  <p>Keep track of your belongings and spend less time searching for them.</p>
                  <button className="button button-light" onClick={openAddForm}>
                    ＋ Add an object
                  </button>
                </div>
                <div className="welcome-art" aria-hidden="true">
                  <span className="art-spark spark-one">✦</span>
                  <span className="art-spark spark-two">✧</span>
                  <span className="art-box">📦</span>
                  <span className="art-pin">📍</span>
                </div>
              </section>

              <div className="section-heading">
                <div>
                  <h2>My Objects</h2>
                  <p>Your belongings, all in one place.</p>
                </div>
                <span className="object-count">{objects.length} {objects.length === 1 ? 'object' : 'objects'}</span>
              </div>

              <div className="toolbar">
                <div className="search-box">
                  <span>⌕</span>
                  <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search by name, location, or notes..."
                    aria-label="Search objects"
                  />
                  {search && <button onClick={() => setSearch('')} aria-label="Clear search">×</button>}
                </div>
                <select
                  className="filter-select"
                  value={categoryFilter}
                  onChange={(event) => setCategoryFilter(event.target.value)}
                  aria-label="Filter by category"
                >
                  <option value="All">All categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {filteredObjects.length > 0 ? (
                <div className="objects-grid">
                  {filteredObjects.map((item) => (
                    <article className="object-card" key={item.id}>
                      <button
                        className="object-art"
                        onClick={() => {
                          setSelectedObject(item)
                          setView('details')
                        }}
                        aria-label={`View ${item.name}`}
                      >
                        <span className="object-emoji">{item.emoji || '📦'}</span>
                        <span className="category-pill">{item.category}</span>
                      </button>
                      <div className="object-info">
                        <button
                          className="object-name"
                          onClick={() => {
                            setSelectedObject(item)
                            setView('details')
                          }}
                        >
                          {item.name}
                        </button>
                        <p className="object-location"><span>📍</span> {item.location}</p>
                        <p className="object-notes">{item.notes || 'No notes added.'}</p>
                        <div className="object-card-footer">
                          <span className="saved-label"><span>●</span> Saved in PlaceBack</span>
                          <button className="edit-link" onClick={() => openEditForm(item)}>Edit</button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <span>🔎</span>
                  <h3>{objects.length ? 'No matching objects' : 'Your collection starts here'}</h3>
                  <p>
                    {objects.length
                      ? 'Try another search or category.'
                      : 'Add your first object and record exactly where you put it.'}
                  </p>
                  {objects.length === 0 && (
                    <button className="button button-primary" onClick={openAddForm}>＋ Add your first object</button>
                  )}
                </div>
              )}
            </>
          )}
          <footer className="page-footer">PlaceBack · A little more organized, every day.</footer>
        </main>
      </div>
    </div>
  )
}

export default App
