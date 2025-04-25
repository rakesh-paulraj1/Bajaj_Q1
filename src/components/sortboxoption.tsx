
interface SortOptionsProps {
    currentSort: string;
    onSortChange: (sort: string) => void;
}
export const Sortoptions:React.FC<SortOptionsProps>=({ currentSort, onSortChange })=>{ {
    return (
      <div className=" bg-white space-y-2 pl-2">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="sort"
            className="h-4 w-4 text-white"
            checked={currentSort === 'fees-asc'}
            onChange={() => onSortChange('fees-asc')}
          />
          <span className='text-black'>Fees (Low to High)</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="sort"
            className="h-4 w-4 text-blue-600"
            checked={currentSort === 'experience-desc'}
            onChange={() => onSortChange('experience-desc')}
          />
          <span className='text-black'>Experience (High to Low)</span>
        </label>
      </div>
    );
  }}