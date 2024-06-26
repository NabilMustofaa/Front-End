import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TrainingDetail from './page';
import api from '@/utils/api';

jest.mock('next/navigation', () => ({
  useParams: jest.fn().mockReturnValue({ id: '123' }),
}));

jest.mock('@/utils/api', () => ({
  getArticle: jest.fn(),
  completeArticle: jest.fn(),
  getCompleteArticle: jest.fn(),
  imageUrl: jest.fn(),
}));

describe('TrainingDetail Component', () => {
  beforeEach(() => {

    api.getArticle.mockClear();
    api.completeArticle.mockClear();
    api.getCompleteArticle.mockClear();
  });

  it('renders the TrainingDetail component and loads article data', async () => {

    const mockedArticle = {
      title: 'Sample Article 2',
      thumbnail: '/sample-thumbnail.jpg',
      position_names: 'Sample Position 2',
      body: 'Sample Body',
      steps: 'Step 1, Step 2, Step 3',
    };


    api.getArticle.mockResolvedValue(mockedArticle);
    api.getCompleteArticle.mockResolvedValue({ data: false }); 

    render(<TrainingDetail />);


    await waitFor(() => {
      expect(api.getArticle).toHaveBeenCalledWith('123'); 
    });


    expect(screen.getByText('Sample Article 2')).toBeInTheDocument();
    expect(screen.getByText('Sample Position 2')).toBeInTheDocument();

  });

  it('handles completion of the article', async () => {

    const mockedArticle = {
      title: 'Sample Article',
      thumbnail: 'sample-thumbnail.jpg',
      position_names: 'Sample Position',
      body: 'Sample Body',
      steps: 'Step 1, Step 2, Step 3',
    };

    api.getArticle.mockResolvedValue(mockedArticle);
    api.getCompleteArticle.mockResolvedValue({ data: false }); 

    render(<TrainingDetail />);

  });

});
