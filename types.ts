export enum AnimalStatus {
  HEALTHY = 'HEALTHY',
  OBSERVATION = 'OBSERVATION',
  CRITICAL = 'CRITICAL',
  QUARANTINE = 'QUARANTINE'
}

export enum TransactionType {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT'
}

// 3NF: Species master data separated from Specimen
export interface Species {
  id: string;
  scientificName: string;
  commonName: string;
  conservationStatus: string;
  dietType: string;
}

// 3NF: Habitat location separated
export interface Habitat {
  id: string;
  name: string;
  capacity: number;
  type: string;
  managerId: string;
}

// Core Specimen Entity
export interface Specimen {
  id: string;
  name: string;
  speciesId: string;
  habitatId: string;
  birthDate: string;
  gender: 'M' | 'F';
  acquisitionDate: string;
  status: AnimalStatus;
  imageUrl: string;
}

// Health Logs (One-to-Many with Specimen)
export interface HealthLog {
  id: string;
  specimenId: string;
  timestamp: string;
  veterinarianId: string;
  notes: string;
  vitals: {
    weightKg: number;
    temperatureC: number;
    heartRateBpm: number;
  };
}

// Finance: Chart of Accounts
export interface Account {
  code: string;
  name: string;
  type: 'ASSET' | 'LIABILITY' | 'EQUITY' | 'REVENUE' | 'EXPENSE';
}

// Finance: Journal Entry Header
export interface JournalEntry {
  id: string;
  date: string;
  description: string;
  reference: string;
  status: 'DRAFT' | 'POSTED';
  totalAmount: number;
}

// Finance: Journal Entry Line Items (Normalization)
export interface JournalLine {
  id: string;
  journalEntryId: string;
  accountCode: string;
  type: TransactionType;
  amount: number;
}

// Inventory: Feed Item
export interface FeedItem {
  id: string;
  sku: string;
  name: string;
  unit: string;
  currentStock: number;
  reorderPoint: number;
  costPerUnit: number;
}
