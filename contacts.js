const { nanoid } = require("nanoid");

const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  let deletedContact = null;
  const filteredContacts = contacts.filter((contact) => {
    if (contact.id !== contactId) {
      return contact;
    } else {
      deletedContact = contact;
    }
  });
  await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));
  return deletedContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  const newContacts = [...contacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
