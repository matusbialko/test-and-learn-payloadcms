'use client'

import React, { useState } from 'react'
import { Button } from "@/components/shadcn/ui/button"

import { Bar, BarChart } from "recharts" 
import { ChartContainer, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/shadcn/ui/chart"
import { ChartLegend } from '@/components/shadcn/ui/chart'

interface ChartBlockProps {
  exampleText: string
}

// This is a test block
export const ChartBlock: React.FC<ChartBlockProps> = (props) => {
    const [isOpen, setIsOpen] = useState(true)

    const { exampleText } = props
    const chartData = [
        { month: "January", desktop: 186, mobile: 80 },
        { month: "February", desktop: 305, mobile: 200 },
        { month: "March", desktop: 237, mobile: 120 },
        { month: "April", desktop: 73, mobile: 190 },
        { month: "May", desktop: 209, mobile: 130 },
        { month: "June", desktop: 214, mobile: 140 },
    ]
    const chartConfig = {
        desktop: {
        label: "Desktop",
        color: "#2563eb",
        },
        mobile: {
        label: "Mobile",
        color: "#60a5fa",
        },
    } satisfies ChartConfig

    return (
        <div className={`container my-16 ${isOpen ? 'block' : 'hidden'}`}>
            <div className="max-w-4xl mx-auto">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Chart Block</h3>
                    <div className="prose prose-gray max-w-none">
                        <p className="text-gray-700 leading-relaxed">{exampleText}</p>
                        <br />
                        <ChartContainer config={chartConfig} className="h-[200px] w-full">
                            <BarChart accessibilityLayer data={chartData}>
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <ChartLegend content={<ChartLegendContent />} />
                                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                            </BarChart>
                        </ChartContainer>
                        <br />
                        <Button onClick={() => {setIsOpen(false)}} variant="secondary">Close block</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
