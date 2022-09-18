const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("db/contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();

  const filteredContact = contacts.find(({ id }) => id === contactId);

  return filteredContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const afterDeleteContacts = contacts.filter(({ id }) => id !== contactId);

  await fs.writeFile(contactsPath, JSON.stringify(afterDeleteContacts));
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();

  const ids = contacts.map((item) => +item.id);

  contacts.push({ name, email, phone, id: String(Math.max(...ids) + 1) });

  await fs.writeFile(contactsPath, JSON.stringify(contacts));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
