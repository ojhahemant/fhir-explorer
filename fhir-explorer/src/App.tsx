import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/common/Layout';
import { Dashboard } from './components/Dashboard';
import { PatientList } from './components/patients/PatientList';
import { PatientDetail } from './components/patients/PatientDetail';
import { FhirExplorer } from './components/explorer/FhirExplorer';
import { LearnFhir } from './components/learn/LearnFhir';
import { ResourceKnowledgeBase } from './components/knowledge/ResourceKnowledgeBase';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="patients" element={<PatientList />} />
            <Route path="patients/:id" element={<PatientDetail />} />
            <Route path="explorer" element={<FhirExplorer />} />
            <Route path="learn" element={<LearnFhir />} />
            <Route path="knowledge" element={<ResourceKnowledgeBase />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
