import App from "../../src/App";
import config from "../../src/config";
import Note from "../../src/entities/Note";

// 

describe('App class config', () => {
  
  let app = new App();

  it('App storage type by config file', () => {
    const type = app.getStorageType();
    expect(type).toEqual(config.storage);
  });
});

describe('App class with custom storage type', () => {
  
  const customType = "test_type";
  let app = new App(customType);

  it('Custom app storage type', () => {
    expect(app.getStorageType()).toEqual(customType);
  });
});

describe('App class note methods [local type storage]', () => {

  let app = new App("local");

  it('Create note in local storage', async () => {
    const note = new Note();
    note.Title = "Test";

    const res = await app.createNote(note);
    expect(res).toBe(true);
  });

  it('Count notes in local storage [should me greater than 0]', async () => {
    const notes = await app.getAllNotes();
    expect(notes.length).toBeGreaterThan(0);
  });

  it('Delete first note', async () => {
    const notes = await app.getAllNotes();
    expect(notes.length).toBeGreaterThan(0);

    const note = notes[0];
    const res = await app.deleteNote(note.Id);
    expect(res).toBe(true);
  });
});