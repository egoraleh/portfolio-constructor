import type { PortfolioBlock } from '@/types/PortfolioBlock.ts'

export interface PortfolioCategory {
    id: string,
    title: string,
    position: number,
    blocks: PortfolioBlock[]
}
