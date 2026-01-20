import { UtensilsCrossed } from 'lucide-react';
import React from 'react'

const TransactionsINfoCard = ({icon,title,date,amount,type,hideDeleteBtn,onDelete}) => {

    const getAmountStyles = () => type === 'income'? 'bg-green-50  text-green-800': 'bg-red-50 text-red-800';

  return (
    <div>
        <div>
            {icon ? (
                <img src={icon} alt={title} />
            ):(
                <UtensilsCrossed/>
            )}
        </div>
    </div>
  )
}

export default TransactionsINfoCard