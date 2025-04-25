import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  Grid, 
  Card,
  CardContent,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Divider,
  Chip,
  Box,
  TablePagination,
  CircularProgress,
  Alert,
  IconButton,
  Button,
  Tooltip
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import DatasetIcon from '@mui/icons-material/Dataset';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { format } from 'date-fns';
import { getFeedback, loadMockData } from '../services/api';

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'Suggestion', label: 'Suggestion' },
  { value: 'Bug Report', label: 'Bug Report' },
  { value: 'Feature Request', label: 'Feature Request' },
  { value: 'Other', label: 'Other' }
];

const sortOptions = [
  { value: 'createdAt', label: 'Date' },
  { value: 'name', label: 'Name' },
  { value: 'category', label: 'Category' }
];

const Dashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [filters, setFilters] = useState({
    category: '',
    searchTerm: ''
  });
  
  const [sort, setSort] = useState({
    field: 'createdAt',
    order: 'desc'
  });
  
  const [pagination, setPagination] = useState({
    page: 0,
    limit: 5,
    total: 0
  });
  
  const [loadingMockData, setLoadingMockData] = useState(false);
  const [mockDataMessage, setMockDataMessage] = useState(null);
  
  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const params = {
        category: filters.category,
        searchTerm: filters.searchTerm,
        sortBy: sort.field,
        sortOrder: sort.order,
        page: pagination.page + 1,
        limit: pagination.limit
      };
      
      const response = await getFeedback(params);
      setFeedbacks(response.data);
      setPagination(prev => ({
        ...prev,
        total: response.pagination.total
      }));
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch feedback');
      setFeedbacks([]);
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch feedbacks when filters, sort, or pagination changes
  useEffect(() => {
    fetchFeedbacks();
  }, [
    filters.category, 
    filters.searchTerm, 
    sort.field, 
    sort.order, 
    pagination.page, 
    pagination.limit
  ]);
  
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPagination(prev => ({ ...prev, page: 0 })); // Reset to first page on filter change
  };
  
  const handleSortChange = (field) => {
    setSort(prev => ({
      field,
      order: prev.field === field && prev.order === 'asc' ? 'desc' : 'asc'
    }));
  };
  
  const handleChangePage = (event, newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };
  
  const handleChangeRowsPerPage = (event) => {
    setPagination(prev => ({
      ...prev,
      limit: parseInt(event.target.value, 10),
      page: 0
    }));
  };
  
  const handleLoadMockData = async () => {
    setLoadingMockData(true);
    try {
      const result = await loadMockData();
      setMockDataMessage({
        type: 'success',
        text: result.message
      });
      // Refresh feedback data
      fetchFeedbacks();
    } catch (error) {
      setMockDataMessage({
        type: 'error',
        text: error.message || 'Failed to load mock data'
      });
    } finally {
      setLoadingMockData(false);
      // Auto-hide the message after 5 seconds
      setTimeout(() => {
        setMockDataMessage(null);
      }, 5000);
    }
  };
  
  // Function to determine if any filters are active
  const hasActiveFilters = () => {
    return filters.category !== '' || 
           filters.searchTerm !== '' || 
           sort.field !== 'createdAt' || 
           sort.order !== 'desc';
  };
  
  // Function to reset all filters to default values
  const handleClearFilters = () => {
    setFilters({
      category: '',
      searchTerm: ''
    });
    setSort({
      field: 'createdAt',
      order: 'desc'
    });
    setPagination(prev => ({
      ...prev,
      page: 0
    }));
  };
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Feedback Dashboard
          </Typography>
          
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DatasetIcon />}
            onClick={handleLoadMockData}
            disabled={loadingMockData}
          >
            {loadingMockData ? 'Loading...' : 'Load Mock Data'}
          </Button>
        </Box>
        
        {mockDataMessage && (
          <Alert 
            severity={mockDataMessage.type} 
            sx={{ mb: 3 }}
            onClose={() => setMockDataMessage(null)}
          >
            {mockDataMessage.text}
          </Alert>
        )}
        
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Search"
              name="searchTerm"
              value={filters.searchTerm}
              onChange={handleFilterChange}
              placeholder="Search by name, email or feedback"
            />
          </Grid>
          
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel id="category-filter-label">Category</InputLabel>
              <Select
                labelId="category-filter-label"
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                label="Category"
                startAdornment={<FilterListIcon fontSize="small" sx={{ mr: 1 }} />}
              >
                {categories.map(category => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel id="sort-field-label">Sort By</InputLabel>
              <Select
                labelId="sort-field-label"
                value={sort.field}
                onChange={(e) => handleSortChange(e.target.value)}
                label="Sort By"
                startAdornment={<SortIcon fontSize="small" sx={{ mr: 1 }} />}
                endAdornment={
                  <IconButton 
                    size="small" 
                    onClick={() => setSort(prev => ({ ...prev, order: prev.order === 'asc' ? 'desc' : 'asc' }))}
                    sx={{ mr: 1 }}
                  >
                    {sort.order === 'asc' ? '↑' : '↓'}
                  </IconButton>
                }
              >
                {sortOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Clear all filters">
              <span> {/* Wrapper needed to make disabled Tooltip work properly */}
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<ClearAllIcon />}
                  onClick={handleClearFilters}
                  disabled={!hasActiveFilters()}
                  fullWidth
                >
                  Clear Filters
                </Button>
              </span>
            </Tooltip>
          </Grid>
        </Grid>
        
        <Divider sx={{ mb: 3 }} />
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : feedbacks.length === 0 ? (
          <Alert severity="info">No feedback found.</Alert>
        ) : (
          <>
            <Grid container spacing={3}>
              {feedbacks.map(feedback => (
                <Grid item xs={12} key={feedback._id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h6" component="h2">
                          {feedback.name}
                        </Typography>
                        <Chip 
                          label={feedback.category} 
                          color={
                            feedback.category === 'Bug Report' ? 'error' :
                            feedback.category === 'Feature Request' ? 'primary' :
                            feedback.category === 'Suggestion' ? 'success' : 'default'
                          }
                          size="small"
                        />
                      </Box>
                      
                      <Typography variant="body2" color="textSecondary" gutterBottom>
                        {feedback.email}
                      </Typography>
                      
                      <Typography variant="body1" paragraph>
                        {feedback.feedbackText}
                      </Typography>
                      
                      <Typography variant="caption" color="textSecondary">
                        Submitted on {format(new Date(feedback.createdAt), 'PPP p')}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            
            <TablePagination
              component="div"
              count={pagination.total}
              page={pagination.page}
              onPageChange={handleChangePage}
              rowsPerPage={pagination.limit}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25, 50]}
              sx={{ mt: 2 }}
            />
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Dashboard; 