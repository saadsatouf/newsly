import { ArrowRight } from 'lucide-react';


const BlogCard = ({
  title,summary,author,date, gradient, 
  tag,
  size = 'normal',
  image,
  
}) => {
  const isLarge = size === "large"
  return (
    <div className={`group cursor-pointer ${isLarge ? "col-span-full" : "?"}`}>
      <div className={`bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all
        duration-300 h-full flex ${isLarge ? "flex-col lg:flex-row " : "flex-col"}`}
      >

          <div className={`relative overflow-hidden ${isLarge ? "lg:w-1/2" : "w-full"}
           ${isLarge ? "h-64 lg:h-auto" : "h-48 sm:h-56"}`} 
             style={{background: "linear-gradient(to right, rgba(7, 23, 90, 0.9), rgba(26, 94, 73, 0.8))",}}>
              {image && (
                <img src={image} className='w-full h-full object-cover' />
              )} 
              {
                tag && (
                  <div className='absolute top-4 left-4 bg-[#00ff9f] text-black px-3 sm:px-4 py-1.5 sm:py-2
                  rounded-md text-xs sm:text-sm font-bold shadow-lg'>
                    {tag}
                    </div>
                )
              }

          </div>
          <div className={`p-5 sm:p-6 flex flex-col justify-between ${isLarge ? "lg:w-1/2" : "w-full"} `}>
              <div>
                <h3 className='text-lg sm:text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors
                line-clamp-2'>{title}

                </h3>

                <p className='text-blue-600 text-sm mb-4 line-clamp-3 '>
                  {summary}

                </p>

                <button className='text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors
                inline-flex items-center gap-1 mb-4'>
                       اقرأ المقال 
                  <ArrowRight size={16} className='group-hover:translate-x-1 transition-transform' />

                </button>
              </div>
              <div className='flex items-center gap-3 pt-4 border-t border-gray-100 '>
                <div className='w-10 h-10 rounded-full bg-gradient-to-br from-blue-400
                to-purple-500 flex items-center justify-center text-white font-semibold text-sm
                flex-shrink-0'>
                  {author?.charAt(0)?.toUpperCase() || "A"}

                </div>
                <div className='min-h-0'>
                  <div className='text-sm font-medium text-gray-900 truncate'>{author}

                  </div>
                  <div className='text-xs text-gray-500'>{date}

                  </div>


                </div>

              </div>

          </div>

      </div>

    </div>
  )
};

export default BlogCard;